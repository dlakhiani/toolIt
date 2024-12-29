<template>
    <div class="home-container">
        <div class="problem-form">
            <div class="form-group">
                <label for="carMake">Car Make:</label>
                <input
                    id="carMake"
                    v-model="carMake"
                    type="text"
                    placeholder="e.g., Toyota"
                />
            </div>
            <div class="form-group">
                <label for="carModel">Car Model:</label>
                <input
                    id="carModel"
                    v-model="carModel"
                    type="text"
                    placeholder="e.g., Camry"
                />
            </div>
            <div class="form-group">
                <label for="carYear">Year:</label>
                <input
                    id="carYear"
                    v-model="carYear"
                    type="number"
                    placeholder="e.g., 2018"
                />
            </div>
            <div class="form-group">
                <label for="problem">Describe the Problem:</label>
                <textarea
                    id="problem"
                    v-model="problem"
                    placeholder="Describe what's happening with your car..."
                ></textarea>
            </div>
            <button
                @click.prevent="getDiagnosis"
                :disabled="isLoading"
                class="submit-button"
            >
                {{ isLoading ? "Getting Diagnosis..." : "Get Diagnosis" }}
            </button>
        </div>
        <div
            v-if="diagnosis"
            class="diagnosis-container"
        >
            <h2>Diagnosis & Solution:</h2>
            <p>{{ diagnosis }}</p>
        </div>
        <div
            v-if="error"
            class="error-message"
        >
            {{ error }}
        </div>
    </div>
</template>

<script lang="ts">
    import { useCarDiagnostic } from "@/components/useCarDiagnostic.ts"
    import { CarProblem } from "../../interfaces/CarProblem.ts"

    export default {
        name: "HomeView",
        data() {
            return {
                carMake: "",
                carModel: "",
                carYear: null,
                problem: "",
                diagnosis: "",
                error: "",
                isLoading: false,
                carDiagnostic: useCarDiagnostic(),
            }
        },
        methods: {
            async getDiagnosis() {
                if (!this.carMake || !this.carModel || !this.carYear || !this.problem) {
                    this.error = "Please fill in all fields"
                    return
                }

                try {
                    this.isLoading = true
                    this.error = ""

                    const carProblem = new CarProblem(this.carMake, this.carModel, this.carYear, this.problem)

                    this.diagnosis = await this.carDiagnostic.getDiagnostics(carProblem)
                } catch (err) {
                    this.error = "Failed to get diagnosis. Please try again."
                } finally {
                    this.isLoading = false
                }
            },
        },
    }
</script>
