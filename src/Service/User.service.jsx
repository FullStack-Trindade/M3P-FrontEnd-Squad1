const API_URL = `http://localhost:3000/api/usuarios`

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