const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/pacientes`
const CadastrarPaciente = async (postPacientDb) => {
  try {
    const response = await fetch(url, options);
console.log(response);
    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} - ${errorMessage.message}`
      );
    }

          const response = await fetch(API_URL, {

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


 const Get = (id) => {
  const fetchPatient = async() => {
      const response = await fetch(`API_URL/${id}`);
      const data = await response.json();
      return data;
  }

  return fetchPatient();
}
 const GetAll = () => {
  const fetchPatient = async() => {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data;
  }

  return fetchPatient();
}

export const PacienteService = {
  CadastrarPaciente,
  Get,
  GetAll
};

