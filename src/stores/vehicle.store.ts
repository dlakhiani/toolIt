import { defineStore } from "pinia"
import { TVehicle } from "@interfaces"
import axios from "axios"

export const vehicleStore = defineStore("vehicle", {
    state: () => {
        return {
            vehicle: {} as TVehicle,
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
