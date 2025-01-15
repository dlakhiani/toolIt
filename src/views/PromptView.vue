<template>
    <div class="problem-prompt-page">
        <h1>Describe the Problem</h1>
        <p><strong>Car Info:</strong> {{ carMake }} {{ carModel }} ({{ carYear }})</p>

        <form
            @submit.prevent="getDiagnosis"
            class="problem-form"
        >
            <div class="form-group">
                <label for="problem">Describe the Problem:</label>
                <textarea
                    id="problem"
                    v-model="problem"
                    placeholder="Describe what's happening with your car..."
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                :disabled="isLoading"
                class="submit-button"
            >
                {{ isLoading ? "Getting Diagnosis..." : "Get Diagnosis" }}
            </button>
        </form>

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
    import { defineComponent } from "vue"
    import { useRoute } from "vue-router"
    import { getVehicleDiagnostic } from "@/components/vehicleDiagnostic.ts"

    export default defineComponent({
        name: "PromptView",
        data() {
            return {
                carMake: "",
                carModel: "",
                carYear: 0,
                problem: "",
                diagnosis: "",
                error: "",
                isLoading: false,
            }
        },
        mounted() {
            // Safely extract and validate query parameters
            const carMakeQuery = this.$route.query.carMake
            const carModelQuery = this.$route.query.carModel
            const carYearQuery = Number(this.$route.query.carYear) || 0
            this.carMake = typeof carMakeQuery === "string" ? carMakeQuery : ""
            this.carModel = typeof carModelQuery === "string" ? carModelQuery : ""
            this.carYear = typeof carYearQuery === "number" ? Number(carYearQuery) : 0
        },
        computed: {
            route() {
                return useRoute()
            },
        },
        methods: {
            async getDiagnosis() {
                if (!this.problem) {
                    this.error = "Please describe the problem"
                    return
                }

                try {
                    this.isLoading = true
                    this.error = ""

                    this.diagnosis = await getVehicleDiagnostic(this.carMake, this.carModel, this.carYear, this.problem)
                } catch (err) {
                    this.error = "Failed to get diagnosis. Please try again."
                } finally {
                    this.isLoading = false
                }
            },
        },
    })
</script>

<style scoped>
    .problem-prompt-page {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .submit-button {
        padding: 10px 15px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .diagnosis-container {
        margin-top: 20px;
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
    }
</style>
