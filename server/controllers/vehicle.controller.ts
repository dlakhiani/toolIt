import { Request, Response } from "express"
// import { OpenAI } from "openai"
import dotenv from "dotenv"
import { getVehiclesByYear, promptUnknownProblem, saveVehicle } from "../services/vehicle.service.ts"
import { MarkdownService } from "../services/markdown.service.ts"
import { formatResponseService } from "../services/format.response.service.ts"
import { TVehicle } from "../../interfaces"

dotenv.config()

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// })

export async function addVehicle(req: Request, res: Response) {
    try {
        const vehicle: TVehicle = req.body.vehicle
        if (!vehicle) {
            res.status(404).json({
                message: `No vehicle provided. Aborting save.`,
            })
            return
        }

        saveVehicle(vehicle)
        res.json({ message: `Saved vehicle: ${vehicle.make} ${vehicle.model} (${vehicle.year})` })
    } catch (error) {
        res.status(500).json({ error: `Failed to add vehicle: ${error}` })
    }
}

export async function listVehiclesByYear(req: Request, res: Response) {
    try {
        const year: number = req.body.year
        if (!year) {
            res.status(404).json({
                message: `No year provided`,
            })
            return
        }

        const vehiclesByYear = await getVehiclesByYear(year)
        if (!vehiclesByYear) {
            res.json({
                message: `Failed to find vehicles in year '${year}'`,
            })
            return
        }

        res.json({
            message: `Found ${vehiclesByYear?.length} vehicles`,
            vehiclesByYear,
        })
    } catch (error) {
        res.status(500).json({
            error: `Found no vehicles: ${error}`,
        })
    }
}

export async function diagnose(req: Request, res: Response) {
    try {
        const vehicle: TVehicle = req.body.vehicle
        const problem: string = req.body.problem

        const prompt: string = promptUnknownProblem(vehicle, problem)
        console.log(prompt)

        // const completion = await openai.chat.completions.create({
        //     model: "gpt-4o-mini",
        //     messages: [
        //         {
        //             role: "system",
        //             content: "You are an experienced automotive mechanic and diagnostician.",
        //         },
        //         {
        //             role: "user",
        //             content: prompt,
        //         },
        //     ],
        // })
        // actual output of the ai
        //const diagnosis = completion.choices[0].message?.content
        const markdownDiagnosis = await MarkdownService.readMockMarkdownFile()

        const diagnosis = formatResponseService.parseDiagnosis(markdownDiagnosis)

        const savedFilePath = await MarkdownService.saveMarkdownFile(JSON.stringify(diagnosis, null, 2))
        //actual ai output
        //res.json({ diagnosis })
        res.json({ message: "Markdown file sent", diagnosis, savedFilePath })
    } catch (error) {
        res.status(500).json({ error: `Failed to get diagnosis: ${error}` })
    }
}
