const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/dietas`

const Get = () => {
    const fetchDiet = async() => {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    }

    return fetchDiet();
}

export const DietService = {
    Get
}