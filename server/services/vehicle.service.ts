import { Vehicle } from "../../interfaces/vehicle.interface.ts"

export function promptUnknownProblem(vehicle: Vehicle): string {
    return `As an automotive expert, please diagnose this car problem and provide a solution:
        Car: ${vehicle.year} ${vehicle.make} ${vehicle.model}
        Problem: ${vehicle.problem}
        
        Please provide:
        1. Potential causes
        2. Recommended diagnostic steps
        3. Possible solutions
        4. Estimated cost range for repairs
        5. Whether this is safe to drive with
        6. Urgency of repairs needed`
}
