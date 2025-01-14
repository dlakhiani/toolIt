import { Router } from "express"
import { diagnose } from "../controllers/vehicle.controller.ts"

const vehicleRouter = Router()
vehicleRouter.post("/diagnose", diagnose)

export default vehicleRouter
