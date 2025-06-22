import { chromium } from "playwright"
import { sleep } from "openai/core"
import path from "path"
import { writeFile, mkdir } from "fs/promises"

const baseUrl = 'https://www.startmycar.com';

async function grabCarMakes(page) {
    await page.goto(`${baseUrl}/pickmake`, { waitUntil: "domcontentloaded" })

    // extract all the href attributes immediately before processing them =>
    // avoids browser round-trips + stale element references that may occur when navigating
    const makeElements = await page.locator('.ModelsGrid .ModelRow')
        .evaluateAll(elements =>
            elements.map(el => ({
                text: el.querySelector('.ModelRow__text').textContent,
                href: el.getAttribute('href')
            }))
        );

    return makeElements.map(elem => ({
        ref: elem.text,
        url: `${baseUrl}${elem.href}`
    }));
}

async function grabCarModels(page, url) {
    await page.goto(url, { waitUntil: "domcontentloaded" })

    const modelElements = await page.locator('.ColumnsMax5 div a')
        .evaluateAll(elements =>
            elements.map(el => ({
                href: el.getAttribute('href'),
                text: el.textContent
            }))
        );

    return modelElements.map(elem => ({
        name: elem.text,
        url: `${baseUrl}${elem.href}`
    }));
}

async function buildCarModels(page, models) {
    const modelContent = [];
    for (const model of models) {
        console.log(`grabbing model ${model.name}: ${modelContent.length} of ${models.length}`);
        modelContent.push(await grabCarModelContent(page, model));
        break;
    }

    return modelContent;
}

async function grabCarModelContent(page, model) {
    const url = model.url;
    await page.goto(url, { waitUntil: "domcontentloaded" })

    const contentElements = await page.locator('.SummarySection a.TitleSummary')
        .evaluateAll(elements => elements.map(el => el.getAttribute('href')))
    const urls = contentElements.map(href => `${baseUrl}${href}`);
    
    const info = [];
    for (const url of urls) {
        console.log(`grabbing model ${model.name} content: ${info.length} of ${urls.length}`);
        info.push(await grabContentPage(page, url));
    }

    return {
        ...model,
        info: info,
    }
}

async function grabContentPage(page, url) {
    const type = url.split('/').pop();

    const contentPage = {};
    switch (type) {
        case 'guides':
            contentPage.type = 'guides';
            contentPage.content = await grabGuides(page, url);
            return contentPage;
        // there are others like the 'manuals' => later brev
        default:
            break;
    }
}

/**
 * i cba to restart the script on timeouts, just retry
 * @param fn to retry
 * @param maxRetries limit of retries
 * @param delay delay between retries
 * @returns {Promise<any>}
 */
async function withRetry(fn, maxRetries = 3, delay = 2000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            if (i > 0) console.log('retrying ...');
            return await fn();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await sleep(delay);
        }
    }
}

async function grabGuides(page, url) {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    const guides = [];

    const urls = await page.locator('a.ArticleLink').evaluateAll(elements =>
        elements.map(el => el.getAttribute('href'))
    );

    for (const guideUrl of urls) {
        try {
            await sleep(1000);
            const htmlContent = await withRetry(() => grabHtmlContent(page, guideUrl));
            console.log(`grabbing ${guides.length} of ${urls.length}: `, `${baseUrl}${guideUrl}`, htmlContent.length);
            guides.push(htmlContent);
        } catch (error) {
            console.error(`failed to process ${baseUrl}${guideUrl} after retries:`, error);
        }
    }

    return guides;
}

async function grabHtmlContent(page, url) {
    await page.goto(`${baseUrl}${url}`, { waitUntil: "domcontentloaded" });

    const articleDiv = await page.locator('div.Article');
    const innerDivsOfArticle = await articleDiv.locator('> div');
    return await innerDivsOfArticle.nth(0).innerHTML();
}

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const carMakes = await grabCarMakes(page);
    for (const make of carMakes) {
        const url = make.url;
        console.log(`grabbing make: ${url}`);

        const models = await grabCarModels(page, url);
        console.log(`grabbed models for ${make.url}: ${models.length}`);

        make.models = await buildCarModels(page, models);
        console.log(`built models for ${make.url}: ${make.models.length}`);

        await writeMakeToFile(make.ref, JSON.stringify(make, null, 4));
    }

    await browser.close();
})();

async function writeMakeToFile(title, content, ext = 'json') {
    const formattedTimestamp = new Date().toISOString().replace(/[:T]/g, "-").split(".")[0];
    const fileName = `${title}-${formattedTimestamp}.${ext}`;
    const folderPath = path.resolve("./makes");

    await mkdir(folderPath, { recursive: true })
        .then(async () => {
            const filePath = path.join(folderPath, fileName);
            await writeFile(filePath, content);
            console.log(`wrote file: ${filePath}`);
        })
        .catch(error => console.error(`failed creating folder: ${folderPath}`, error));
}