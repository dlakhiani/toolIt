import { Router } from "express"
import { addVehicle, diagnose } from "../controllers/vehicle.controller.ts"

const vehicleRouter = Router()
vehicleRouter.post("/diagnose", diagnose)
vehicleRouter.post("/add", addVehicle)

export default vehicleRouter
