<template>
    <div class="car-info-page">
        <h1>Enter Car Information</h1>
        <form
            @submit.prevent="goToPromptPage"
            class="car-info-form"
        >
            <div class="form-group">
                <label for="carMake">Car Make:</label>
                <input
                    id="carMake"
                    v-model="carMake"
                    type="text"
                    placeholder="e.g., Toyota"
                    required
                />
            </div>
            <div class="form-group">
                <label for="carModel">Car Model:</label>
                <input
                    id="carModel"
                    v-model="carModel"
                    type="text"
                    placeholder="e.g., Camry"
                    required
                />
            </div>
            <div class="form-group">
                <label for="carYear">Year:</label>
                <input
                    id="carYear"
                    v-model="carYear"
                    type="number"
                    placeholder="e.g., 2018"
                    required
                />
            </div>
            <button
                type="submit"
                class="submit-button"
            >
                Next
            </button>
        </form>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue"
    export default defineComponent({
        name: "CarInfoView",
        data() {
            return {
                carMake: "",
                carModel: "",
                carYear: 0,
            }
        },
        methods: {
            goToPromptPage() {
                if (!this.carMake || !this.carModel || !this.carYear) {
                    alert("Please fill in all fields")
                    return
                }
                this.$router.push({
                    name: "prompt",
                    query: {
                        carMake: this.carMake,
                        carModel: this.carModel,
                        carYear: this.carYear,
                    },
                })
            },
        },
    })
</script>

<style scoped>
    .car-info-page {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .submit-button {
        padding: 10px 15px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
</style>
