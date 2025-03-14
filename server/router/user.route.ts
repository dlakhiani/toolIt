import { Router } from "express"
import { loginUser } from "../controllers/user.controller.ts"

const userRouter = Router()
userRouter.post("/login", loginUser)

export default userRouter
