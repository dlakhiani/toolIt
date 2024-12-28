import axios from 'axios';
import { CarProblem } from '../../interfaces/CarProblem';

export function useCarDiagnostic() {
    const getDiagnostics = async (carProblem: CarProblem): Promise<string> => {
        try {
            const response = await axios.post('/api/diagnose', {
                make: carProblem.make,
                model: carProblem.model,
                year: carProblem.year,
                problem: carProblem.problem,
            });
            return response.data.diagnosis;
        } catch (error) {
            console.error('Error getting diagnosis:', error);
            throw new Error('Failed to get diagnosis');
        }
    };

    return {
        getDiagnostics,
    };
}
