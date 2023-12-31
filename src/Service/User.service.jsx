const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/usuarios`

const fetchUser = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
        return data;
  } catch (error) {
    console.error("Erro na chamada da API:", error);
    throw error;
  }
};

export const UserService = {
  Create: (data) => {
        return fetchUser(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  Get: () => {
    return fetchUser(`${API_URL}`);
  },
  
  SearchByCpfEmail: (data) => {
    return fetchUser(`${API_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },


  Update: (id, data) => {
    return fetchUser(`${API_URL}${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },
  Delete: (id) => {
    return fetchUser(`${API_URL}${id}`, {
      method: "DELETE",
    });
  },
};
