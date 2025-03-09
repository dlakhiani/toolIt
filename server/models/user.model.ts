import mongoose, { HydratedDocument, Model, Schema } from "mongoose"
import { compare, genSalt, hash } from "bcrypt"

interface IUser extends Document {
    name: string
    email: string
    passwordHash: string
    loginAt: Date
    createdAt: Date
}

interface IUserMethods {
    getGreeting(): string
    comparePasswordHash(passwordHash: string): Promise<boolean>
}

type HydratedUser = HydratedDocument<IUser, IUserMethods> | null

interface IUserModel extends Model<IUser, IUserMethods> {
    findByEmail(email: string): Promise<HydratedUser>
}

const userSchema = new Schema<IUser, IUserModel, IUserMethods>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        loginAt: {
            type: Date,
        },
    },
    {
        // adds createdAt and updatedAt timestamps
        timestamps: true,
    }
)

// model hooks
userSchema.pre("save", async function (next) {
    if (!this.isModified("passwordHash")) return next()

    try {
        const salt = await genSalt()
        this.passwordHash = await hash(this.passwordHash, salt)
        next()
    } catch (err: unknown) {
        if (err instanceof Error) {
            next(err)
        } else {
            next(new Error("An unknown error occurred while hashing the password"))
        }
    }
})

// instance methods
userSchema.method("getGreeting", function getGreeting(): string {
    return `Hello, ${this.name}!`
})
userSchema.method("comparePasswordHash", async function comparePasswordHash(passwordHash: string): Promise<boolean> {
    return compare(passwordHash, this.passwordHash)
})

// static methods
userSchema.static("findByEmail", function findByEmail(email: string): Promise<HydratedUser> {
    return this.findOne({ email })
})

const User = mongoose.model<IUser, IUserModel>("user", userSchema)

export { HydratedUser, IUser }
export default User
