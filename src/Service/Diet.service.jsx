const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/dietas`

const Get = () => {
    const fetchDiet = async() => {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    }

    return fetchDiet();
}

const Create = (data) => {
    const fetchDiet = async() => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })
        
        return response
    }

    return fetchDiet();
}

export const DietService = {
    Get,
    Create
}