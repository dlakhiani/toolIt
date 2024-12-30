import { OpenAI } from "openai"
import { CarProblem } from "../../interfaces/CarProblem.ts"
import { Router } from "express"
import dotenv from "dotenv"

dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const router = Router()

// TODO: should probably move these into individual controllers + routes
// when adding more models then barrel to server
router.post("/diagnose", async (req, res) => {
    try {
        const { make, model, year, problem } = req.body

        const carProblem = new CarProblem(make, model, year, problem)
        const prompt = carProblem.generatePrompt()

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
})

export default router
