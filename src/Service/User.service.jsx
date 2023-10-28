const fetchUser = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na chamada da API:", error);
    throw error;
  }
};

export const UserService = {
  Create: (data) => {
    return fetchUser("http://localhost:3000/api/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  Get: () => {
    return fetchUser("http://localhost:3333/api/usuarios");
  },
  Show: (id) => {
    return fetchUser(`http://localhost:3333/api/usuarios/${id}`);
  },
  
  SearchByCpfEmail: (data) => {
    return fetchUser("http://localhost:3000/api/usuarios/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  Update: (id, data) => {
    return fetchUser(`http://localhost:3333/api/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },
  Delete: (id) => {
    return fetchUser(`http://localhost:3333/api/usuarios/${id}`, {
      method: "DELETE",
    });
  },
};