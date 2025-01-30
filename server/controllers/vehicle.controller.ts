import { Request, Response } from "express"
import { OpenAI } from "openai"
import dotenv from "dotenv"
import { promptUnknownProblem } from "../services/vehicle.service.ts"
import { MarkdownService } from "../services/markdown.service.ts"
import path from "path"
import { readFile } from "fs/promises"

dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function diagnose(req: Request, res: Response) {
    try {
        const { make, model, year, problem } = req.body

        // const prompt: string = promptUnknownProblem({
        //     make,
        //     model,
        //     year,
        //     problem,
        // })

        // const completion = await openai.chat.completions.create({
        //     model: "gpt-4o-mini",
        //     messages: [
        //         {
        //             role: "system",
        //             content: "You are an experienced automotive mechanic and diagnostician.",
        //         },
        //         {
        //             role: "user",
        //             content: prompt,
        //         },
        //     ],
        // })
        // actual output of the ai
        //const diagnosis = completion.choices[0].message?.content

        const mockFilePath = path.resolve("./server/mocks/mockResponse.md")
        const markdownDiagnosis = await readFile(mockFilePath, "utf-8")

        const diagnosis = await MarkdownService.saveMarkdownFile(markdownDiagnosis)
        //actual ai output
        //res.json({ diagnosis })
        res.json({ message: "Markdown file sent", diagnosis })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ error: "Failed to get diagnosis" })
        console.error("Error:", error)
        res.status(500).json({ error: "Failed to get diagnosis" })
    }
}
