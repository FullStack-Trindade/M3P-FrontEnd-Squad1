const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/auth`;

const Create = (data) => {
    const fetchAuth = async() => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })
        
        return response
    }

    return fetchAuth();
}

const Get = () => {
    const fetchAuth = async() => {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        return data;
    } 

    return fetchAuth();
}

const Delete = (id) => {
    const fetchAuth = async() => {
        const response = await fetch(`${API_URL}/${ id }`, {
            method: 'DELETE',
        })

        return response
    }

    return fetchAuth()
}

export const AuthService = {
    Create,
    Get,
    Delete
}