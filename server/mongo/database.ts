import mongoose from "mongoose"
import { User, Vehicle, Problem } from "../models"

export default async function connectToMongo() {
    try {
        // test connection when booted
        await mongoose.connect(process.env.MONGODB_URI!)
        await mongoose.connection.db?.admin().command({
            ping: 1,
        })
        console.log("Connected to MongoDB successfully")

        // TODO: clear after implementing user flow from UI
        const newUser = new User({
            name: "John Doe",
            email: "forgotAboutDatDoe@test.com",
            passwordHash: "encryptDeez",
        })

        const foundUser = await User.findByEmail("forgotAboutDatDoe@test.com")
        if (foundUser) {
            const isValid = await foundUser.comparePasswordHash("encryptDeez")
            if (isValid) console.log(foundUser.getGreeting())
        } else {
            const savedUser = await newUser.save()
            console.log(`Saved User: ${savedUser.name}`)
        }

        // TODO: clear after implementing vehicle flow from UI ... trust imma do it
        const newProblem = new Problem({
            title: "Cold Start Issues",
            symptoms: ["Engine cranks slowly", "Takes multiple attempts to start"],
            steps: [
                {
                    step: 1,
                    description: "Check battery voltage",
                    toolsNeeded: ["Multimeter", "Battery tester"],
                },
                {
                    step: 2,
                    description: "Inspect starter connections",
                    toolsNeeded: ["Socket set", "Wire brush"],
                },
            ],
            userReports: 1,
            successRate: 85,
            lastUpdatedAt: new Date(),
        })

        const newVehicle = new Vehicle({
            make: "Toyota",
            model: "Corolla",
            year: 2019,
            lastUpdatedAt: new Date(),
        })

        const foundVehicles = await Vehicle.findVehiclesByYear(2019)
        if (foundVehicles.length > 0) {
            for (const vehicle of foundVehicles) {
                const problems = await vehicle.getProblems()
                console.log(problems)
            }
        } else {
            const savedProblem = await newProblem.save()
            newVehicle.problems = [savedProblem._id]

            const savedVehicle = await newVehicle.save()
            console.log(`Saved Vehicle: ${savedVehicle.make} ${savedVehicle.model} (${savedVehicle.year})`)
        }

        const foundProblem = await Problem.findProblemByTitle("Cold Start Issues")
        if (foundProblem) console.log(foundProblem.getSteps())
    } catch (error) {
        console.error("MongoDB connection error:", error)
    } finally {
        mongoose.disconnect()
    }
}
