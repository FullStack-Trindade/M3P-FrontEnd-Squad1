const CadastrarUsuarioPaciente = async (postUsuarioDb) => {
    try {
    const response = await fetch("http://localhost:3000/api/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postUsuarioDb),
    });

    if (response.status === 201) {
      const result = await response.json();
      return result.id;
    } else {
      const errorData = await response.json();
      console.error("Erro ao cadastrar Usuário do Paciente. Status:", response.status);
      console.error("Detalhes do erro:", errorData.message);
      alert("Erro ao cadastrar Usuário do Paciente: " + errorData.message);
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    alert("Erro ao cadastrar usuario");
  }
};

export const UsuarioService = {
  CadastrarUsuarioPaciente,
};
