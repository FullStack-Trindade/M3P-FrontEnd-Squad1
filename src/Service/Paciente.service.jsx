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
    return fetchPatient("http://localhost:3000/api/pacientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  Get: () => {
    return fetchPatient("http://localhost:3000/api/pacientes");
  },
  Show: (id) => {
    return fetchPatient(`http://localhost:3000/api/pacientes/${id}`);
  },
  SearchByUserId: (id) => {
    return fetchPatient(`http://localhost:3000/api/pacientes/usuario/${id}`);
  },
  Update: (id, data) => {
    return fetchPatient(`http://localhost:3000/api/pacientes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },
  Delete: (id) => {
    return fetchPatient(`http://localhost:3000/api/pacientes/${id}`, {
      method: "DELETE",
    });
  },
};
