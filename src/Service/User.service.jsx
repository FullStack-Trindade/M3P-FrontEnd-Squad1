const Get = async () => {
    const response = await fetch("http://localhost:3333/api/usuarios");
    const data = await response.json();

    return data;
   }
const CadastrarUser = async (postUserDb) => {
  try {
      const response = await fetch("http://localhost:3333/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postUserDb),
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

export const UserService = {
  CadastrarUser,
  Get
};