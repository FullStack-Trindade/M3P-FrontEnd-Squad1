// BUSCANDO NO DB DA API
const CreateExame = async (postExameDb) => {
    try {
        const response = await fetch("http://localhost:3333/api/exames", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postExameDb),
        });
        if (response.status === 201) {
            const result = await response.json();
            console.log(("Resposta do servidor:", result));
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
    CreateExame,
};

// import { LocalStorageService } from "./LocalStorage.service";

// const API_URL = 'http://localhost:3000/exames'



// const Get = async () => {
//    /*  return localStorage.getItem('users')  ? JSON.parse(localStorage.getItem('users')) : null */
//     const response = await fetch(API_URL);
//     const data = await response.json();

//     return data;
//    }

// const Create = async(data) => {
//     const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//             'Accept': 'aplication/json',
//             'Content-Type': 'aplication/json',
//         },
//         body: JSON.stringify(data),
//     });
//     const res = await response.json();
//     console.log(res && `Paciente ${data.nome} criado com sucesso`);
// }

// const CreateExame = async(ExameData) => {
//     await fetch(API_URL, {
//         method: "POST",
//         body: JSON.stringify(ExameData),
//         headers: {
//           "Content-type": "application/json",
//         },
//       })
//         .then(async (data) => {
//          const res = await data.json();
//           console.log(res);
//           console.log("Consulta cadastrado com sucesso");
//         })
//         .catch((err) => {
//           console.log(err);
//         });
  
// }

// const Show = async (id) => {

// const response = await fetch(`${API_URL}/${id}`);
// const data = await response.json();
 
// return data;
// }

// const ShowByEmail = async (email) => {
//     const filter = `?email=${email}`;
//     const response = await fetch(`${API_URL}/${filter}`);
//     const data = await response.json();
    
//     return data[0];
// }

// const ShowByNome = async (nome) => {
//     const filter = `?nome=${nome}`;
//     const response = await fetch(`${API_URL}/${filter}`);
//     const data = await response.json();
    
//     return data;
// }

// const Delete = (id) => {
//     LocalStorageService.set('consultas', Get().filter( consultas => consultas.id !== id));
// }

// const DeleteExame = (id) => {
//     LocalStorageService.set('exames', Get().filter( exames => exames.id !== id));
// }


// const Update = (id, newUser) => {
//     const users = Get();
//     users[users.find(user => user.ide === id).indexOf] = newUser;
//     LocalStorageService.set('users', users)
// }



// export const ExameService = {
//     Get,
//     Create,
//     CreateExame,
//     Show,
//     ShowByEmail,
//     ShowByNome,
//     Delete,
//     DeleteExame,
//     Update
// }