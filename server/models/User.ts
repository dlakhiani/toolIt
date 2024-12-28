import mongoose, { HydratedDocument, Model, Schema } from "mongoose"

interface IUser {
    name: string
    email: string
    createdAt: Date
}

interface IUserMethods {
    getGreeting(): string
}

interface IUserModel extends Model<IUser, IUserMethods> {
    findByEmail(email: string): Promise<HydratedDocument<IUser, IUserMethods>>
}

const userSchema = new Schema(
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
    },
    {
        // Adds createdAt and updatedAt timestamps
        timestamps: true,
    }
)

userSchema.method("getGreeting", function getGreeting(): string {
    return `Hello, ${this.name}!`
})

userSchema.static("findByEmail", function findByEmail(email: string) {
    return this.findOne({ email })
})

const User = mongoose.model<IUser, IUserModel>("User", userSchema)

export default User
