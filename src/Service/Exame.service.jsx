import { LocalStorageService } from "../Service/LocalStorage.service";

const API_URL = 'http://localhost:3000/exames'



const Get = async () => {
   /*  return localStorage.getItem('users')  ? JSON.parse(localStorage.getItem('users')) : null */
    const response = await fetch(API_URL);
    const data = await response.json();

    return data;
   }


const CreateExame = async(exameData) => {
    await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(exameData),
        headers: {

          "Content-type": "application/json",
        },
      })
        .then(async (data) => {
         const res = await data.json();
          console.log(res);
          console.log("Exame cadastrado com sucesso");
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


const ShowByNome = async (nome) => {
    const filter = `?nome=${nome}`;
    const response = await fetch(`${API_URL}/${filter}`);
    const data = await response.json();
    
    return data;
}

const Delete = (id) => {
    LocalStorageService.set('exame', Get().filter( user => user.id !== id));
}

const Update = (id, newExame) => {
    const exame = Get();
    exame[exame.find(exame => exame.ide === id).indexOf] = newExame;
    LocalStorageService.set('exame', exame)
}



export const ExameService = {
    Get,
    CreateExame,
    Show,
    ShowByNome,
    Delete,
    Update
}