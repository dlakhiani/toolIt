import express from "express"
import { OpenAI } from "openai"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import User from "./models/User.ts"

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

interface CarProblem {
    make: string
    model: string
    year: number
    problem: string
}

app.post("/api/diagnose", async (req, res) => {
    try {
        const { make, model, year, problem }: CarProblem = req.body

        const prompt = `As an automotive expert, please diagnose this car problem and provide a solution:
        Car: ${year} ${make} ${model}
        Problem: ${problem}
        
        Please provide:
        1. Potential causes
        2. Recommended diagnostic steps
        3. Possible solutions
        4. Estimated cost range for repairs
        5. Whether this is safe to drive with
        6. Urgency of repairs needed`

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are an experienced automotive mechanic and diagnostician.",
                },
                { role: "user", content: prompt },
            ],
        })

        const diagnosis = completion.choices[0].message?.content || "No diagnosis available"
        res.json({ diagnosis })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ error: "Failed to get diagnosis" })
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export default app
