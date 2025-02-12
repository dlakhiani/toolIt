import { Request, Response } from "express"
// import { OpenAI } from "openai"
import dotenv from "dotenv"
import { promptUnknownProblem } from "../services/vehicle.service.ts"
import { MarkdownService } from "../services/markdown.service.ts"
import { formatResponseService } from "../services/format.response.service.ts"
import { Vehicle } from "../../interfaces/vehicle.interface.ts"

dotenv.config()

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// })

export async function diagnose(req: Request, res: Response) {
    try {
        const vehicle: Vehicle = req.body.vehicle
        const problem: string = req.body.problem

        const prompt: string = promptUnknownProblem(vehicle, problem)
        console.log(prompt)

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
        const markdownDiagnosis = await MarkdownService.readMockMarkdownFile()

        const diagnosis = formatResponseService.parseDiagnosis(markdownDiagnosis)

        const savedFilePath = await MarkdownService.saveMarkdownFile(JSON.stringify(diagnosis, null, 2))
        //actual ai output
        //res.json({ diagnosis })
        res.json({ message: "Markdown file sent", diagnosis, savedFilePath })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ error: "Failed to get diagnosis" })
    }
}
