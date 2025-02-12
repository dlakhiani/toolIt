import { defineStore } from "pinia"
import { Vehicle } from "../../interfaces/vehicle.interface.ts"
import axios from "axios"

export const vehicleStore = defineStore("vehicle", {
    state: () => {
        return {
            vehicle: {} as Vehicle,
            problem: "",
            diagnosis: "",
        }
    },
    actions: {
        async loadDiagnosis() {
            try {
                const response = await axios.post("/api/diagnose", {
                    vehicle: this.vehicle,
                    problem: this.problem,
                })
                this.diagnosis = response.data.diagnosis
            } catch (error) {
                console.error("Error getting diagnosis:", error)
                throw new Error("Failed to get diagnosis")
            }
        },
    },
})
