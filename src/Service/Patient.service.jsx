const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/pacientes`

const Get = () => {
    const fetchPatient = async() => {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    }

    return fetchPatient();
}

export const PatientService = {
    Get
}