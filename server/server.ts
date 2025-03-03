import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectToMongo from "./mongo/database.ts"
import mongoose from "mongoose"
import router from "./router"
// removing this for now -- takes too long to
// init and doesn't do anything rn x_x
// import "./instrumentation.ts"

dotenv.config()

const app = express()
// server status check
app.get("/", (_, res) => {
    res.status(200).json({
        status: "ayeaye",
    })
})

app.use(express.json())
app.use(cors())

app.use("/api", router)

const PORT = process.env.PORT || 3000
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`)
    await connectToMongo()
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
