import { TVehicle } from "../../interfaces"
import { Vehicle } from "../models"
import { HydratedVehicle } from "../models/vehicle.model"

/**
 * may not be necessary, but use if problems are not requested
 * @param vehicle entire model
 * @returns limited model for client
 */
function convertVehicle(vehicle: HydratedVehicle): TVehicle {
    if (!vehicle) return null

    return {
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
    } as TVehicle
}

export async function saveVehicle(vehicle: TVehicle) {
    const vehicleData = new Vehicle(vehicle)
    vehicleData.save()
}

export async function getVehiclesByYear(year: number) {
    if (!year) return null

    const vehicles = await Vehicle.findVehiclesByYear(year)
    if (!vehicles || vehicles.length == 0) return null

    return vehicles.map((vehicle) => convertVehicle(vehicle))
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
