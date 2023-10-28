const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/exames`

const Get = () => {
    const fetchExam = async() => {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    }

    return fetchExam();
}

const Create = (data) => {
    const fetchExam = async() => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })
        
        return response
    }

    return fetchExam();
}

const Show = (id) => {
    const fetchExam = async() => {
        const response = await fetch(`${API_URL}?id=${id}`);
        const data = await response.json();
        return data;
    } 

    return fetchExam();
}

const Update = (id, data) => {
    const fetchExam = async() => {
        const response = await fetch(`${API_URL}/${ id }`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })

        return response
    }

    return fetchExam()
}

const Delete = (id) => {
    const fetchExam = async() => {
        const response = await fetch(`${API_URL}/${ id }`, {
            method: 'DELETE',
        })

        return response
    }

    return fetchExam()
}

export const ExamService = {
    Get,
    Create,
    Show,
    Update,
    Delete
}