const API_URL = `http://localhost:3000/api/pacientes`

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