// const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/usuarios`

// const Get = () => {
//     const fetchUser = async() => {
//         const response = await fetch(API_URL);
//         const data = await response.json();
//         return data;
//     }

//     return fetchUser();
// }

// const Create = async(data) => {
//     const objeto = {
//         "name": data.name,
//         "gender": data.gender,
//         "cpf": data.cpf,
//         "phone": data.phone,
//         "email": data.email,
//         "password":data.password,
//         "id_type": data.id_type
//     }

//     console.log(objeto)
//     const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(objeto)
//     });

//     const res = await response.json();

//     if(res.status === 201){
//         console.log(`Cadastro ${res.name} realizado com sucesso!`);
//     }else{
//         console.log(res.status)
//     }
// }

// const CreateUser = async(UserData) => {
//     await fetch(API_URL, {
//         method: "POST",
//         body: JSON.stringify(UserData),
//         headers: {
//             "Content-type": "application/json",
//         },
//     })
//         .then(async (data) => {
//             const res = await data.json();
//             console.log(res);
//             console.log("cadastrado com sucesso");
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }

// const Show = async (id) => {

//     const response = await fetch(`${API_URL}/${id}`);
//     const data = await response.json();
    
//     return data;
// }

// const ShowByName = async (nome) => {
//     const filter = `?nome=${nome}`;
//     const response = await fetch(`${API_URL}/${filter}`);
//     const data = await response.json();

//     return data;
// }

// const ShowByEmail = async (email) => {
//     const filter = `?email=${email}`;
//     const response = await fetch(`${API_URL}/${filter}`);
//     const data = await response.json();

//     return data[0];
// }

// // const Delete = (id) => {
// //     LocalStorageService.set('users', Get().filter( user => user.id !== id));
// // }

// // const Update = (id, newUser) => {
// //     const users = Get();
// //     users[users.find(user => user.ide === id).indexOf] = newUser;
// //     LocalStorageService.set('users', users)
// // }

// export const UserService = {
//     Get,
//     Create,
//     CreateUser,
//     Show,
//     ShowByName,
//     ShowByEmail,
//     // Delete,
//     // Update
// }
