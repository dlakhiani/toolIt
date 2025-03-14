import { Router } from "express"
import { addVehicle, diagnose, listVehiclesByYear } from "../controllers/vehicle.controller.ts"

const vehicleRouter = Router()
vehicleRouter.post("/diagnose", diagnose)
vehicleRouter.post("/add", addVehicle)
vehicleRouter.get("/listVehiclesByYear", listVehiclesByYear)

export default vehicleRouter
