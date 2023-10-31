const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/consultas`

const Get = () => {
    const fetchAppointment = async() => {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    }

    return fetchAppointment();
}

const Create = (data) => {
    const fetchAppointment = async() => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })
        
        return response
    }

    return fetchAppointment();
}

const Show = (id) => {
    const fetchAppointment = async() => {
        const response = await fetch(`${API_URL}?id=${id}`);
        const data = await response.json();
        return data;
    } 

    return fetchAppointment();
}

const Update = (id, data) => {
    const fetchAppointment = async() => {
        const response = await fetch(`${API_URL}/${ id }`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })

        return response
    }

    return fetchAppointment()
}

const Delete = (id) => {
    const fetchAppointment = async() => {
        const response = await fetch(`${API_URL}/${ id }`, {
            method: 'DELETE',
        })

        return response
    }

    return fetchAppointment()
}

export const AppointmentService = {
    Get,
    Create,
    Show,
    Update,
    Delete
}