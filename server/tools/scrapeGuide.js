import { chromium } from "playwright"

const baseUrl = 'https://www.startmycar.com';

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`${baseUrl}/pickmake`, { waitUntil: "load" })

    const carMakes = {};
    const carLinks = await page.locator('.ModelsGrid .ModelRow').all();

    for (const link of carLinks) {
        const make = await link.locator('.ModelRow__text').textContent();
        const url = await link.getAttribute('href');

        carMakes[make] = { url: `${baseUrl}${url}` };
    }

    for (const make in carMakes) {
        const url = carMakes[make].url;
        await page.goto(url, { waitUntil: "load" })
        const carModelLinks = await page.locator('.ColumnsMax5 div a').all();

        const carModels = {};
        for (const model of carModelLinks) {
            const modelUrl = await model.getAttribute('href');
            const modelName = await model.textContent();
            carModels[modelName] = { url: `${baseUrl}${modelUrl}` };
        }

        carMakes[make] = {
            url: url,
            models: carModels
        };
    }

    console.log(JSON.stringify(carMakes));
    await browser.close();
})();
