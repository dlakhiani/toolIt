import axios from "axios"

export async function getVehicleDiagnostic(
    make: string,
    model: string,
    year: string,
    problem: string
): Promise<string> {
    try {
        const response = await axios.post("/api/diagnose", {
            make: make,
            model: model,
            year: year,
            problem: problem,
        })
        return response.data.diagnosis
    } catch (error) {
        console.error("Error getting diagnosis:", error)
        throw new Error("Failed to get diagnosis")
    }
}
