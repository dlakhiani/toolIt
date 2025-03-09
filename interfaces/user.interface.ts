import { IUser } from "../server/models/user.model"

type TLimitedUser = Pick<IUser, "email" | "name" | "loginAt">

export type TUser = TLimitedUser | null
