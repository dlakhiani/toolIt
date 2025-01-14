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

<script setup>
    import { ref, onMounted } from "vue"
    import { useRoute } from "vue-router"
    import { useCarDiagnostic } from "@/components/useCarDiagnostic.ts"
    import { CarProblem } from "../../interfaces/CarProblem.ts"

    const route = useRoute()

    const carMake = ref("")
    const carModel = ref("")
    const carYear = ref(null)
    const problem = ref("")
    const diagnosis = ref("")
    const error = ref("")
    const isLoading = ref(false)
    const carDiagnostic = useCarDiagnostic()

    onMounted(() => {
        carMake.value = route.query.carMake || ""
        carModel.value = route.query.carModel || ""
        carYear.value = route.query.carYear || ""
    })

    const getDiagnosis = async () => {
        if (!problem.value) {
            error.value = "Please describe the problem"
            return
        }

        try {
            isLoading.value = true
            error.value = ""

            const carProblem = new CarProblem(carMake.value, carModel.value, carYear.value, problem.value)

            diagnosis.value = await carDiagnostic.getDiagnostics(carProblem)
        } catch (err) {
            error.value = "Failed to get diagnosis. Please try again."
        } finally {
            isLoading.value = false
        }
    }
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
