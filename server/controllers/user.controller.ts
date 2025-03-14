import { Request, Response } from "express"
import { getUserLogin } from "../services/user.service.ts"

export async function loginUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body

        const user = await getUserLogin(email, password)
        if (!user) {
            res.status(404).json({
                message: `User with email '${email}' does not exist`,
            })
            return
        }

        res.json({
            message: `User found: ${user.name}`,
            user,
        })
    } catch (error) {
        res.status(500).json(`Server Error: Failed at Login: ${error}`)
    }
}
