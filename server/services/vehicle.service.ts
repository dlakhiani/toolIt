import { TVehicle } from "../../interfaces"
import { Vehicle } from "../models"

export async function saveVehicle(vehicle: TVehicle) {
    const vehicleData = new Vehicle(vehicle)
    vehicleData.save()
}

export function promptUnknownProblem(vehicle: TVehicle, problem: string): string {
    if (!vehicle) throw new Error("Prompt failed: Vehicle is empty")

    return `As an automotive expert, please diagnose this car problem and provide a solution:
        Car: ${vehicle.year} ${vehicle.make} ${vehicle.model}
        Problem: ${problem}
        
        Please provide:
        1. Potential causes
        2. Recommended diagnostic steps
        3. Possible solutions
        4. Estimated cost range for repairs
        5. Whether this is safe to drive with
        6. Urgency of repairs needed`
}
