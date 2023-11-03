const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/pacientes`
const CadastrarPaciente = async (postPacientDb) => {
  try {

          const response = await fetch(API_URL, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postPacientDb),
    });
    if (response.status === 201) {
      const result = await response.json();
      console.log("Resposta do servidor:", result);
      alert("Cadastro efetuado com sucesso");
    } else {
      const errorData = await response.json();
      console.error("Erro ao cadastrar paciente. Status:", response.status);
      console.error("Detalhes do erro:", errorData.message);
      alert("Erro ao cadastrar paciente: " + errorData.message);
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    alert("Erro ao cadastrar paciente");
  }
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

