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
    }
    if (response.status === 409) {
      const result = await response.json();
      console.log(result);
      alert("CPF ou email já estão cadastrados. Contate o Admnistrador.");
      return
    }
    if (response.status === 400) {
      const result = await response.json();
            console.log(result);
      alert("Erro na resposta do servidor. Confira os campos e, se persistir, contate o Administrador");
      return
    }
    // else {
    //   const errorData = await response.json();
    //   console.error(
    //     "Erro ao cadastrar Usuário do Paciente. Status:",
    //     response.status
    //   );
    //   console.error("Detalhes do erro:", errorData.message);
    //   alert("Erro ao cadastrar Usuário do Paciente: " + errorData.message);
    // }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    alert("Erro Crítico. Contate o Administrador");
    return
  }
};

export const UsuarioService = {
  CadastrarUsuarioPaciente,
};
