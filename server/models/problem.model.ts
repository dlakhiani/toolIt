import mongoose, { Model, Schema, HydratedDocument } from "mongoose"

interface IProblemSteps {
    step: number
    description: string
    toolsNeeded: string[]
}

const problemStepsSchema = new Schema({
    step: {
        type: Number,
        required: [true, "At least 1 step is required"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    toolsNeeded: [String],
})

interface IProblem {
    title: string
    symptoms: string[]
    steps: IProblemSteps[]
    userReports: number
    successRate: number
    lastUpdatedAt: Date
}

interface IProblemMethods {
    getSteps(): IProblemSteps[]
}

type HydratedProblem = HydratedDocument<IProblem, IProblemMethods> | null

interface IProblemModel extends Model<IProblem, IProblemMethods> {
    findProblemByTitle(title: string): Promise<HydratedProblem>
}

const problemSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            unique: true,
        },
        symptoms: [String],
        steps: [problemStepsSchema],
        userReports: {
            type: Number,
            default: 0,
        },
        successRate: {
            type: Number,
            default: 0,
        },
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
problemSchema.method("getSteps", function getSteps(): IProblemSteps[] {
    return this.steps
})

// static methods
problemSchema.static("findProblemByTitle", function findProblemByTitle(title: string): Promise<HydratedProblem> {
    return this.findOne({ title })
})

const Problem = mongoose.model<IProblem, IProblemModel>("problem", problemSchema)

export { IProblem, IProblemSteps, HydratedProblem }
export default Problem
