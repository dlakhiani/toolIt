export class formatResponseService {
    public static parseDiagnosis(response: string): Record<string, unknown> {
        try {
            const uniqueResponse = [...new Set(response.split("\n").map((line) => line.trim()))].join("\n")

            const parsedDiagnosis: Record<string, unknown> = {
                vehicle: "",
                problem: "",
                potentialCauses: [],
                recommendedFixes: [],
                estimatedCost: "",
                safetyInfo: "",
            }

            // Split response into sections by headers (###)
            const sections = uniqueResponse.split(/###\s+/)

            if (!sections.length || sections.length === 1) {
                console.warn("No structured sections found in the markdown response.")
                return { error: "Failed to parse diagnosis response. The response might not be structured properly." }
            }

            // Use a map to associate titles with parsing logic
            const parsers: Record<string, (lines: string[], section: string) => void> = {
                Vehicle: (_, section) => {
                    const vehicleMatch = section.match(/\*\*Vehicle\*\*:\s*(.+)/)
                    if (vehicleMatch) parsedDiagnosis.vehicle = vehicleMatch[1].trim()

                    const problemMatch = section.match(/\*\*Problem\*\*:\s*(.+)/)
                    if (problemMatch) parsedDiagnosis.problem = problemMatch[1].trim()
                },
                "Potential Causes": (lines) => {
                    parsedDiagnosis.potentialCauses = lines
                        .filter((line) => {
                            return (
                                line.trim() !== "" &&
                                !line.toLowerCase().includes("potential causes") &&
                                line.startsWith("-")
                            )
                        })
                        .map((line) => line.replace(/^- \*\*(.*?)\*\*: /, "").trim())
                },
                "Recommended Diagnostic Steps": (lines) => {
                    parsedDiagnosis.recommendedFixes = lines
                        .filter((line) => {
                            return (
                                line.trim() !== "" &&
                                !line.toLowerCase().includes("recommended diagnostic steps") &&
                                (line.startsWith("-") || line.match(/^\d+\./))
                            )
                        })
                        .map((line) =>
                            line
                                .replace(/^\d+\.\s*/, "")
                                .replace(/\*\*(.*?)\*\*:\s*/, "")
                                .trim()
                        )
                },
                "Estimated Cost Range for Repairs": (lines) => {
                    parsedDiagnosis.estimatedCost = lines
                        .filter((line) => {
                            return (
                                line.trim() !== "" && !line.toLowerCase().includes("estimated cost range for repairs")
                            )
                        })
                        .map((line) => line.replace(/\*/g, "").trim())
                },
                "Whether This is Safe to Drive With": (lines) => {
                    const safetyInfoList = lines
                        .filter((line) => {
                            return (
                                line.trim() !== "" && !line.toLowerCase().includes("whether this is safe to drive with")
                            )
                        })
                        .map((line) => {
                            const titleMatch = line.match(/\*\*(.*?)\*\*/)
                            const explanation = line.replace(/\*\*(.*?)\*\*/, "").trim()

                            return titleMatch ? { [titleMatch[1].trim()]: explanation } : null
                        })
                        .filter((entry) => entry !== null)

                    parsedDiagnosis.safetyInfo = safetyInfoList
                },
            }

            // Parse each section
            sections.forEach((section) => {
                const lines = section.trim().split("\n")
                const title = lines.shift()?.trim()

                if (!title) return

                // Check if the title matches any parser
                for (const key of Object.keys(parsers)) {
                    if (title.includes(key)) {
                        parsers[key](lines, section)
                        break
                    }
                }
            })

            return parsedDiagnosis
        } catch (error) {
            console.error("Error parsing AI response:", error)
            return { error: "Failed to parse diagnosis response." }
        }
    }
}
