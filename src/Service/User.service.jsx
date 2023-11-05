const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/usuarios`

const Get = () => {
    const fetchUser = async() => {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    }

    return fetchUser();
}

export const UserService = {
    Get
}