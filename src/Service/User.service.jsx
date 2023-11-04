const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api`

const fetchUser = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Erro na chamada da API:", error);
    throw error;
  }
};

export const UserService = {
  Create: (data) => {
    console.log(data)
    return fetchUser(`${API_URL}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  Get: () => {
    return fetchUser(`${API_URL}/usuarios`);
  },
  
  SearchByCpfEmail: (data) => {
    return fetchUser(`${API_URL}/usuarios/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  Update: (id, data) => {
    return fetchUser(`${API_URL}/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },
  Delete: (id) => {
    return fetchUser(`${API_URL}/usuarios/${id}`, {
      method: "DELETE",
    });
  },
};