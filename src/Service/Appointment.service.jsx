const API_URL = 'http://localhost:3000/api/consultas'

const Get = () => {
    const fetchAppointment = async() => {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    }

    return fetchAppointment();
}

export const AppointmentService = {
    Get
}