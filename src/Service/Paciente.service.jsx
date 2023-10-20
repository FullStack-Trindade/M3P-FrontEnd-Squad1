import { LocalStorageService } from "../Service/LocalStorage.service";

const API_URL = 'http://localhost:3000/pacientes'



const Get = async () => {
   /*  return localStorage.getItem('users')  ? JSON.parse(localStorage.getItem('users')) : null */
    const response = await fetch(API_URL);
    const data = await response.json();

    return data;
   }


const CreatePaciente = async(pacienteData) => {
    await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(pacienteData),
        headers: {

          "Content-type": "application/json",
        },
      })
        .then(async (data) => {
         const res = await data.json();
          console.log(res);
          console.log("Paciente cadastrado com sucesso");
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

const ShowByNome = async (nome) => {
    const filter = `?nome=${nome}`;
    const response = await fetch(`${API_URL}/${filter}`);
    const data = await response.json();
    
    return data;
}

const Delete = (id) => {
    LocalStorageService.set('users', Get().filter( user => user.id !== id));
}

const DeletePaciente = (id) => {
    LocalStorageService.set('users', Get().filter( user => user.name !== name));
}


const Update = (id, newUser) => {
    const users = Get();
    users[users.find(user => user.ide === id).indexOf] = newUser;
    LocalStorageService.set('users', users)
}



export const PacienteService = {
    Get,
    CreatePaciente,
    Show,
    ShowByEmail,
    ShowByNome,
    Delete,
    DeletePaciente,
    Update
}