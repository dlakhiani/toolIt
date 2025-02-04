import { readFile } from "fs/promises"
import path from "path"

export class formatresponseService {
    public static parseDiagnosis(response: string): Record<string, any> {
        try {
            // Remove duplicate content if any
            const uniqueResponse = [...new Set(response.split("\n"))].join("\n")

            // Define the structured output
            const parsedDiagnosis: Record<string, any> = {
                vehicle: "",
                problem: "",
                potentialCauses: [],
                recommendedFixes: [],
                estimatedCost: "",
                safetyInfo: "",
            }

            // Split response by sections (### indicates sections)
            const sections = uniqueResponse.split(/###\s+/)

            if (!sections.length || sections.length === 1) {
                console.warn("No structured sections found in the markdown response.")
                return { error: "Failed to parse diagnosis response. The response might not be structured properly." }
            }
            sections.forEach((section) => {
                const lines = section.trim().split("\n")
                const title = lines.shift()?.trim()

                if (!title) return

                switch (true) {
                    case title.includes("Vehicle") || title.includes("Diagnosis & Solution"):
                        // Extract vehicle details if included
                        const vehicleMatch = section.match(/\*\*Vehicle\*\*:\s*(.+)/)
                        if (vehicleMatch) parsedDiagnosis.vehicle = vehicleMatch[1].trim()

                        // Extract problem details
                        const problemMatch = section.match(/\*\*Problem\*\*:\s*(.+)/)
                        if (problemMatch) parsedDiagnosis.problem = problemMatch[1].trim()
                        break

                    case title.includes("Potential Causes"):
                        parsedDiagnosis.potentialCauses = lines
                            .filter((line) => line.startsWith("-"))
                            .map((line) => line.replace(/^- \*\*(.*?)\*\*: /, "").trim())
                        break

                    case title.includes("Recommended Diagnostic Steps") || title.includes("Possible Solutions"):
                        parsedDiagnosis.recommendedFixes = lines
                            .filter((line) => line.startsWith("-") || line.match(/^\d+\./))
                            .map((line) =>
                                line
                                    .replace(/^\d+\.\s/, "")
                                    .replace(/^- /, "")
                                    .trim()
                            )
                        break

                    case title.includes("Estimated Cost Range for Repairs"):
                        parsedDiagnosis.estimatedCost = lines
                            .filter((line) => line.includes("$"))
                            .join(" ")
                            .trim()
                        break

                    case title.includes("Whether This is Safe to Drive With"):
                        parsedDiagnosis.safetyInfo = lines.join(" ").trim()
                        break

                    default:
                        break
                }
            })

            return parsedDiagnosis
        } catch (error) {
            console.error("Error parsing AI response:", error)
            return { error: "Failed to parse diagnosis response." }
        }
    }
}
