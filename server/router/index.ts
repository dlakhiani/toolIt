import { Router } from "express"
import vehicleRouter from "./vehicle.route.ts"
import userRouter from "./user.route.ts"

const router = Router()
router.use("/vehicle", vehicleRouter)
router.use("/user", userRouter)

export default router
