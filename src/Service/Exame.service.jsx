const CadastrarExame = async (postExameDb) => {
    try {
        const response = await fetch("http://localhost:3333/api/exames", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postExameDb),
        });
        if (response.status === 201) {
            const resultado = await response.json();
            console.log(("Resposta do servidor:", resultado));
            alert("Cadastro efetuado com sucesso");
        } else {
            const errorData = await response.json();
            console.error("Erro ao cadastrar paciente. Status:", response.status);
            console.error("Detalhes do erro:", errorData.message);
            alert("Erro ao cadastrar paciente: " + errorData.message);
        }
    } catch (error) {
        console.error("Error ao buscar dados:", error);
        alert("Erro ao cadastrar paciente");
    }
};

export const ExameService = {
    CadastrarExame,
};