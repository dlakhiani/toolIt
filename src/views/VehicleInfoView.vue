<template>
    <div class="vehicle-info-page">
        <h1>Enter Vehicle Information</h1>
        <form
            @submit.prevent="goToPromptPage"
            class="car-info-form"
        >
            <div class="form-group">
                <label for="make">Make:</label>
                <input
                    v-model="vehicle.make"
                    type="text"
                    placeholder="e.g., Toyota"
                    required
                />
            </div>
            <div class="form-group">
                <label for="model">Model:</label>
                <input
                    v-model="vehicle.model"
                    type="text"
                    placeholder="e.g., Camry"
                    required
                />
            </div>
            <div class="form-group">
                <label for="year">Year:</label>
                <input
                    v-model="vehicle.year"
                    type="number"
                    placeholder="e.g., 2018"
                    required
                />
            </div>
            <button
                type="submit"
                class="submit-button"
            >
                Enter
            </button>
        </form>
    </div>
</template>

<script lang="ts">
    import { vehicleStore } from "@/stores/vehicle.store"
    import { mapState } from "pinia"
    import { defineComponent } from "vue"

    export default defineComponent({
        name: "VehicleInfoView",
        computed: {
            ...mapState(vehicleStore, ["vehicle"]),
            isValid() {
                return this.vehicle.make && this.vehicle.model && this.vehicle.year
            },
        },
        methods: {
            goToPromptPage() {
                if (!this.isValid) {
                    alert("Please fill in all fields")
                    return
                }
                this.$router.push({
                    name: "prompt",
                })
            },
        },
    })
</script>

<style scoped>
    .vehicle-info-page {
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
