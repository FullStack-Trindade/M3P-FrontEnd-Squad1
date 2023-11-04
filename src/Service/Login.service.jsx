const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/usuarios/login`;

const Authenticate = (data) => {
    const fetchLogin = async() => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })
        
        return response
    }

    return fetchLogin();
}

export const LoginService = {
    Authenticate
}