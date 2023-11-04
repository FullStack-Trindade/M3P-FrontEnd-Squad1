const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api`;

const CreateToken = (data) => {
    const fetchPassword = async() => {
        const response = await fetch(`${API_URL}/requisitarSenha`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })

        return response
    }

    return fetchPassword()
}

const Update = (data) => {
    const fetchPassword = async() => {
        const response = await fetch(`${API_URL}/resetarSenha`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })

        return response
    }

    return fetchPassword()
}

export const PasswordService = {
    CreateToken,
    Update
}