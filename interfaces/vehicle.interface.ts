import { IVehicle } from "../server/models/vehicle.model.ts"

type TVehicle = Pick<IVehicle, "make" | "model" | "year"> | null

export { TVehicle }
