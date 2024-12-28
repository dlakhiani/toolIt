import express from "express"
import { OpenAI } from "openai"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import User from "./models/User.ts"
import { CarProblem } from "../interfaces/CarProblem"

dotenv.config()

try {
    // test connection when booted
    await mongoose.connect(process.env.MONGODB_URI!)
    await mongoose.connection.db?.admin().command({
        ping: 1,
    })
    console.log("Connected to MongoDB successfully")

    const newUser = new User({
        name: "John Doe",
        email: "forgotAboutDatDoe@test.com",
    })
    console.log(newUser.name)

    await User.findByEmail("forgotAboutDatDoe@test.com").then((user) => {
        if (user) {
            console.log(user.getGreeting())
        } else {
            newUser.save().then(() => {
                console.log(`Saved User: ${newUser.name}`)
                mongoose.disconnect()
            })
        }
    })
} catch (error) {
    console.error("MongoDB connection error:", error)
}

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

export default app
