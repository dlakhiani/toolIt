<template>
    <div class="home-container">
        <div class="problem-form">
        <div class="form-group">
            <label>Car Make:</label>
            <input v-model="carMake" type="text" placeholder="e.g., Toyota" />
        </div>
        <div class="form-group">
            <label>Car Model:</label>
            <input v-model="carModel" type="text" placeholder="e.g., Camry" />
        </div>
        <div class="form-group">
            <label>Year:</label>
            <input v-model="carYear" type="number" placeholder="e.g., 2018" />
        </div>
        <div class="form-group">
            <label>Describe the problem:</label>
            <textarea 
                v-model="problem" 
                placeholder="Describe what's happening with your car... (e.g., strange noise when braking, won't start in cold weather, etc.)"
                rows="4"
            ></textarea>
        </div>
        <button 
            @click="getDiagnosis" 
            :disabled="isLoading"
            class="submit-button"
        >
            {{ isLoading ? 'Getting Diagnosis...' : 'Get Diagnosis' }}
        </button>
        </div>

        <div v-if="diagnosis" class="diagnosis-container">
        <h2>Diagnosis & Solution</h2>
        <div class="diagnosis-content">
            {{ diagnosis }}
        </div>
        </div>

        <div v-if="error" class="error-message">
            {{ error }}
        </div>
    </div>
</template>
  
<script>
    import { useCarDiagnostic } from '@/components/useCarDiagnostic'
    
    export default {
        name: 'HomeView',
        data() {
            return {
                carMake: '',
                carModel: '',
                carYear: null,
                problem: '',
                diagnosis: '',
                error: '',
                isLoading: false,
                carDiagnostic: useCarDiagnostic()
            }
        },
        methods: {
            async getDiagnosis() {
                if (!this.carMake || !this.carModel || !this.carYear || !this.problem) {
                    this.error = 'Please fill in all fields'
                    return
                }
        
                try {
                    this.isLoading = true
                    this.error = ''
                    this.diagnosis = await this.carDiagnostic.getDiagnostics({
                        make: this.carMake,
                        model: this.carModel,
                        year: this.carYear,
                        problem: this.problem
                    })
                } catch (err) {
                    this.error = 'Failed to get diagnosis. Please try again.'
                } finally {
                    this.isLoading = false
                }
            }
        }
    }
</script>
  
<style scoped>
    .home-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .problem-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    label {
        font-weight: bold;
        color: #2c3e50;
    }

    input, textarea {
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
    }

    textarea {
        resize: vertical;
    }

    .submit-button {
        padding: 0.75rem;
        background-color: #42b983;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
    }

    .submit-button:disabled {
        background-color: #95d5b7;
        cursor: not-allowed;
    }

    .diagnosis-container {
        background-color: #f8f9fa;
        padding: 1rem;
        border-radius: 4px;
    }

    .error-message {
        color: #dc3545;
        padding: 0.5rem;
        background-color: #f8d7da;
        border-radius: 4px;
    }
</style>
  