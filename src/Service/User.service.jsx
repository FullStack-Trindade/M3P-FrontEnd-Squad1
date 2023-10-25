/*import { LocalStorageService } from "./LocalStorage.service";

const API_URL = 'http://localhost:3333/users'




const Create = async(data) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
        body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log(res && `Usuario ${data.email} criado com sucesso`);
}

const CreateUser = async(UserData) => {
    await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(UserData),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then(async (data) => {
         const res = await data.json();
         console.log(res);
         console.log("cadastrado com sucesso");
        })
        .catch((err) => {
          console.log(err);
        });
        
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
  
  
  const Delete = (id) => {
    LocalStorageService.set('users', Get().filter( user => user.id !== id));
}

const DeletePaciente = (id) => {
  LocalStorageService.set('users', Get().filter( user => user.id !== id));
}


const Update = (id, newUser) => {
  const users = Get();
  users[users.find(user => user.ide === id).indexOf] = newUser;
  LocalStorageService.set('users', users)
}



export const UserService = {
  Get,
  Create,
  CreateUser,
  Show,
  ShowByEmail,
  Delete,
  Update
}*/
const Get = async () => {
    const response = await fetch("http://localhost:3333/api/usuario");
    const data = await response.json();

    return data;
   }
const CadastrarUser = async (postUserDb) => {
  try {
      const response = await fetch("http://localhost:3333/api/usuario", {
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