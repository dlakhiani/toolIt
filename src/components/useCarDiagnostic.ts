import axios from 'axios';

interface CarProblem {
    make: string
    model: string
    year: number
    problem: string
}

export function useCarDiagnostic() {
    const getDiagnostics = async (carProblem: CarProblem): Promise<string> => {
        try {
            const response = await axios.post('/api/diagnose', carProblem)
            return response.data.diagnosis
        } catch (error) {
            console.error('Error getting diagnosis:', error)
            throw new Error('Failed to get diagnosis')
        }
    }

    return {
        getDiagnostics
    }
}
