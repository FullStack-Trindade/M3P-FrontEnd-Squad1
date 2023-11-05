// BUSCANDO NO DB DA API
/* const CadastrarExame = async (postExameDb) => {
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
}; */

/* import { LocalStorageService } from "./LocalStorage.service"; */

const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/exames`



const Get = () => {
  const fetchExam = async() => {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data;
  }

  return fetchExam();
}

const Create = (examData) => {
  const fetchExam = async() => {
      const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( examData )
      })
      
      return response
  }

  return fetchExam();
}

const Show = async (id) => {

const response = await fetch(`${API_URL}/${id}`);
const data = await response.json();
 
return data;
}

const ShowByEmail = async (email) => {
    const filter = `?email=${email}`;
    const response = await fetch(`${API_URL}/${filter}`);
    const data = await response.json();
    
    return data[0];
}

const ShowByNome = async (nome) => {
    const filter = `?nome=${nome}`;
    const response = await fetch(`${API_URL}/${filter}`);
    const data = await response.json();
    
    return data;
}

const Delete = (id) => {
  const fetchExam = async() => {
      const response = await fetch(`${API_URL}/${ id }`, {
          method: 'DELETE',
      })

      return response
  }

  return fetchExam()
}


const Update = (id, data) => {
  const fetchExam = async() => {
      const response = await fetch(`${API_URL}/${ id }`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( data )
      })

      return response
  }

  return fetchExam()
}



export const ExamService = {
    Get,
    Create,
    Show,
    Delete,
    Update
}