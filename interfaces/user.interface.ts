import { IUser } from "../server/models/user.model"

type TUser = Pick<IUser, "email" | "name" | "loginAt"> | null

export { TUser }
