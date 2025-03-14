import mongoose, { HydratedDocument, Model, Types, Schema } from "mongoose"
import { IProblem } from "./problem.model.ts"

interface IVehicle {
    make: string
    model: string
    year: number
    problems: Types.ObjectId[]
    lastUpdatedAt: Date
}

interface IVehicleMethods {
    getProblems(): Promise<IProblem[]>
}

type HydratedVehicle = HydratedDocument<IVehicle, IVehicleMethods> | null

interface IVehicleModel extends Model<IVehicle, IVehicleMethods> {
    findVehiclesByYear(year: number): Promise<HydratedVehicle[]>
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
                type: Types.ObjectId,
                ref: "problem",
                default: [],
            },
        ],
        lastUpdatedAt: {
            type: Date,
        },
    },
    {
        // adds createdAt and updatedAt timestamps
        timestamps: true,
    }
)

// instance methods
vehicleSchema.method("getProblems", async function getProblems(): Promise<IProblem[]> {
    return await this.populate("problems").then((vehicle) => vehicle.problems as IProblem[])
})

// static methods
vehicleSchema.static("findVehiclesByYear", function findVehiclesByYear(year: number): Promise<HydratedVehicle[]> {
    return this.find({ year })
})

const Vehicle = mongoose.model<IVehicle, IVehicleModel>("vehicle", vehicleSchema)

export { IVehicle, HydratedVehicle }
export default Vehicle
