<template>
    <div class="problem-prompt-page">
        <h1>Describe the Problem</h1>
        <p><strong>Vehicle Info:</strong> {{ vehicle.make }} {{ vehicle.model }} ({{ vehicle.year }})</p>

        <form
            @submit.prevent="getDiagnosis"
            class="problem-form"
        >
            <div class="form-group">
                <label for="problem">Describe the Problem:</label>
                <textarea
                    v-model="vehicle.problem"
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
        <div class="button-group">
            <button
                @click="goToView('/settings')"
                class="nav-button"
            >
                Go to Settings
            </button>
            <button
                @click="goToView('/about')"
                class="nav-button"
            >
                About Page
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import { vehicleStore } from "@/stores/vehicle.store"
    import { mapActions, mapState } from "pinia"

    export default defineComponent({
        name: "PromptView",
        data() {
            return {
                error: "",
                isLoading: false,
            }
        },
        computed: {
            ...mapState(vehicleStore, ["vehicle", "diagnosis"]),
        },
        methods: {
            ...mapActions(vehicleStore, ["loadDiagnosis"]),
            async getDiagnosis() {
                if (!this.vehicle.problem) {
                    this.error = "Please describe the problem"
                    return
                }

                try {
                    this.isLoading = true
                    this.error = ""
                    await this.loadDiagnosis()
                } catch (err) {
                    this.error = "Failed to get diagnosis. Please try again."
                } finally {
                    this.isLoading = false
                }
            },
            goToView(route: string) {
                this.$router.push(route)
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
    .button-group {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
    }

    .nav-button {
        padding: 10px 15px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        flex: 1;
        margin: 0 5px;
        font-size: 1rem;
    }

    .nav-button:hover {
        background-color: #0056b3;
    }
</style>
