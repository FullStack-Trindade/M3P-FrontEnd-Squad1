const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api`;

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

const UserService = {
  Create: (data) => {
    const url = `${API_URL}/usuarios`;
    return fetchUser(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  Get: () => {
    const url = `${API_URL}/usuarios`;
    return fetchUser(url);
  },
  SearchByCpfEmail: (data) => {
    const url = `${API_URL}/usuarios/search`;
    return fetchUser(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  Update: (id, data) => {
    const url = `${API_URL}/usuarios/${id}`;
    return fetchUser(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },
  Delete: (id) => {
    const url = `${API_URL}/usuarios/${id}`;
    return fetchUser(url, {
      method: "DELETE",
    });
  },
  Show: async (id) => {
    const url = `${API_URL}/usuarios/${id}`;
    return fetchUser(url);
  },
  ShowByName: async (nome) => {
    const filter = `?nome=${nome}`;
    const url = `${API_URL}/${filter}`;
    return fetchUser(url);
  },
  ShowByEmail: async (email) => {
    const filter = `?email=${email}`;
    const url = `${API_URL}/${filter}`;
    return fetchUser(url);
  },
};

export { UserService };
