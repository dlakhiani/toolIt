import { User } from "../models"
import { HydratedUser } from "../models/user.model"
import { TUser } from "../../interfaces"

/**
 * reduce what is exposed on the client ...
 * @param user entire model
 * @returns limited model for client
 */
function convertUser(user: HydratedUser): TUser {
    if (!user) return null

    return {
        email: user.email,
        name: user.name,
        loginAt: user.loginAt,
    } as TUser
}

async function comparePasswordHash(user: HydratedUser, password: string) {
    if (!user) return false

    try {
        return user.comparePasswordHash(password)
    } catch (error) {
        console.log(`Failed to verify password hash for ${user.name}: ${error}`)
        return false
    }
}

export async function getUserLogin(email: string, password: string): Promise<TUser> {
    const user = await User.findByEmail(email)
    const isValid = await comparePasswordHash(user, password)

    return isValid ? convertUser(user) : null
}
