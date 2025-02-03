import mongoose from "mongoose"
// import { User } from "../models"

export default async function connectToMongo() {
    try {
        // test connection when booted
        await mongoose.connect(process.env.MONGODB_URI!)
        await mongoose.connection.db?.admin().command({
            ping: 1,
        })
        console.log("Connected to MongoDB successfully")

        // TODO: clear after implementing user flow from UI
        // const newUser = new User({
        //     name: "John Doe",
        //     email: "forgotAboutDatDoe@test.com",
        //     passwordHash: "encryptDeez",
        // })

        // const foundUser = await User.findByEmail("forgotAboutDatDoe@test.com")
        // if (foundUser) {
        //     const isValid = await foundUser.comparePasswordHash("encryptDeez")
        //     if (isValid) console.log(foundUser.getGreeting())
        // } else {
        //     newUser.save().then(() => {
        //         console.log(`Saved User: ${newUser.name}`)
        //         mongoose.disconnect()
        //     })
        // }
    } catch (error) {
        console.error("MongoDB connection error:", error)
    }
}
