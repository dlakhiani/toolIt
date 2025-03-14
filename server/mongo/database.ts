import mongoose from "mongoose"

export default async function connectToMongo() {
    try {
        // test connection when booted
        await mongoose.connect(process.env.MONGODB_URI!)
        await mongoose.connection.db?.admin().command({
            ping: 1,
        })
        console.log("Connected to MongoDB successfully")
    } catch (error) {
        console.error("MongoDB connection error:", error)
        process.exit(1)
    }
}
