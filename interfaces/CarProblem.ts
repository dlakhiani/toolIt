export class CarProblem {
    make: string;
    model: string;
    year: number;
    problem: string;

    constructor(make: string, model: string, year: number, problem: string) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.problem = problem;
    }

    generatePrompt(): string {
        return `As an automotive expert, please diagnose this car problem and provide a solution:
        Car: ${this.year} ${this.make} ${this.model}
        Problem: ${this.problem}
        
        Please provide:
        1. Potential causes
        2. Recommended diagnostic steps
        3. Possible solutions
        4. Estimated cost range for repairs
        5. Whether this is safe to drive with
        6. Urgency of repairs needed`;
    }
}