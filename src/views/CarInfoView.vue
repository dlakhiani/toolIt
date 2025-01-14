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

<script setup>
    import { ref } from "vue"
    import { useRouter } from "vue-router"

    const router = useRouter()

    const carMake = ref("")
    const carModel = ref("")
    const carYear = ref(null)

    const goToPromptPage = () => {
        if (!carMake.value || !carModel.value || !carYear.value) {
            alert("Please fill in all fields")
            return
        }

        router.push({
            name: "prompt",
            query: {
                carMake: carMake.value,
                carModel: carModel.value,
                carYear: carYear.value,
            },
        })
    }
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
