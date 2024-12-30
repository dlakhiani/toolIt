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
        // })
        // console.log(newUser.name)

        // await User.findByEmail("forgotAboutDatDoe@test.com").then((user) => {
        //     if (user) {
        //         console.log(user.getGreeting())
        //     } else {
        //         newUser.save().then(() => {
        //             console.log(`Saved User: ${newUser.name}`)
        //             mongoose.disconnect()
        //         })
        //     }
        // })
    } catch (error) {
        console.error("MongoDB connection error:", error)
    }
}
