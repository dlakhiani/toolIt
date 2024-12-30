import express from "express"
import { OpenAI } from "openai"
import dotenv from "dotenv"
import cors from "cors"
import { CarProblem } from "../interfaces/CarProblem.ts"
import connectToMongo from "./mongo/database.ts"
import mongoose from "mongoose"

dotenv.config()

await connectToMongo()

const app = express()
app.use(express.json())
app.use(cors())

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

app.post("/api/diagnose", async (req, res) => {
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

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

async function shutdown(signal: string) {
    console.log(`\n${signal} received. Shutting down ...`)

    try {
        await mongoose.disconnect()
        console.log("Database connection closed.")
    } catch (error) {
        console.error("Error while closing database connection:", error)
    }

    process.exit(0)
}

process.on("SIGINT", () => shutdown("SIGINT"))
process.on("SIGTERM", () => shutdown("SIGTERM"))

export default app
