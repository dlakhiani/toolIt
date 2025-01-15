import { Router } from "express"
import vehicleRouter from "./vehicle.route.ts"

const router = Router()
router.use("/", vehicleRouter)

export default router
