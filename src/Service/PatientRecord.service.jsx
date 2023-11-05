const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/prontuarios`;

const Show = () => {
    const fetchPatientRecord = async() => {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        return data;
    } 

    return fetchPatientRecord();
}

export const PatientRecordService = {
    Show
}