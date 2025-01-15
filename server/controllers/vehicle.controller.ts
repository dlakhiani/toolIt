import { Request, Response } from "express"
import { OpenAI } from "openai"
import dotenv from "dotenv"
import { promptUnknownProblem } from "../services/vehicle.service.ts"

dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function diagnose(req: Request, res: Response) {
    try {
        const { make, model, year, problem } = req.body

        const prompt: string = promptUnknownProblem({
            make,
            model,
            year,
            problem,
        })

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an experienced automotive mechanic and diagnostician.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        })
        const diagnosis = completion.choices[0].message?.content || "No diagnosis available"
        res.json({ diagnosis })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ error: "Failed to get diagnosis" })
        console.error("Error:", error)
        res.status(500).json({ error: "Failed to get diagnosis" })
    }
}
