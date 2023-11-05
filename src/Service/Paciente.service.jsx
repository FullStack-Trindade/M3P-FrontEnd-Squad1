const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api`

const fetchPatient = async (url, options) => {
  try {
    const response = await fetch(url, options);
console.log(response);
    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} - ${errorMessage.message}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro na chamada da API:`, error);
    throw error;
  }
};

export const PacienteService = {
  Create: (data) => {
    return fetchPatient(`${API_URL}/pacientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  Get: () => {
    return fetchPatient(`${API_URL}/pacientes`);
  },
  Show: (id) => {
    return fetchPatient(`${API_URL}/pacientes/${id}`);
  },
  SearchByUserId: (id) => {
    return fetchPatient(`${API_URL}/pacientes/usuario/${id}`);
  },
  Update: (id, data) => {
    return fetchPatient(`${API_URL}/pacientes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },
  Delete: (id) => {
    return fetchPatient(`${API_URL}/pacientes/${id}`, {
      method: "DELETE",
    });
  },
};
