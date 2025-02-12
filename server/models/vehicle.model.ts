import mongoose, { HydratedDocument, Model, Schema } from "mongoose"

interface ProblemStats {
    title: string
    userReports: number
    successRate: number
}

interface IVehicle {
    make: string
    model: string
    year: number
    problems: ProblemStats[]
    lastUpdatedAt: Date
}

interface IVehicleMethods {
    getProblems(): ProblemStats[]
}

interface IVehicleModel extends Model<IVehicle, IVehicleMethods> {
    findVehiclesByYear(year: number): Promise<HydratedDocument<IVehicle, IVehicleMethods>[]>
}

const vehicleSchema = new Schema(
    {
        make: {
            type: String,
            required: [true, "Make is required"],
            trim: true,
        },
        model: {
            type: String,
            required: [true, "Model is required"],
            trim: true,
        },
        year: {
            type: Number,
            required: [true, "Year is required"],
        },
        problems: [
            {
                title: {
                    type: String,
                    required: [true, "Title is required"],
                },
                userReports: {
                    type: Number,
                    default: 0,
                },
                successRate: {
                    type: Number,
                    default: 0,
                },
            },
        ],
    },
    {
        // adds createdAt and updatedAt timestamps
        timestamps: true,
    }
)

// instance methods
vehicleSchema.method("getProblems", function getProblems(): ProblemStats[] {
    return this.problems
})

// static methods
vehicleSchema.static("findVehiclesByYear", function findVehiclesByYear(year: number): Promise<
    HydratedDocument<IVehicle, IVehicleMethods>[]
> {
    return this.find({ year })
})

const Vehicle = mongoose.model<IVehicle, IVehicleModel>("vehicle", vehicleSchema)

export default Vehicle
