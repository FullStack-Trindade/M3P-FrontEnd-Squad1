const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api`

const fetchUser = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Erro na chamada da API:", error);
    throw error;
  }
};

export const UserService = {
  Create: (data) => {
    console.log(data)
    return fetchUser(`${API_URL}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  Get: () => {
    return fetchUser(`${API_URL}/usuarios`);
  },
  
  SearchByCpfEmail: (data) => {
    return fetchUser(`${API_URL}/usuarios/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  Update: (id, data) => {
    return fetchUser(`${API_URL}/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },
  Delete: (id) => {
    return fetchUser(`${API_URL}/usuarios/${id}`, {
      method: "DELETE",
    });
  },
};


const Create = async(data) => {

    const objeto = {
      "name": data.name,
      "gender": data.gender,
      "cpf": data.cpf,
      "phone": data.phone,
      "email": data.email,
      "password":data.password,
      "id_type": data.id_type
    }
  
        console.log(objeto)
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(objeto)
      });
      const res = await response.json();
      if(res.status === 201){
        console.log(`Cadastro ${res.name} realizado com sucesso!`);
      }else{
        console.log(res.status)
      }
  
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
  
  const ShowByName = async (nome) => {
  
    const filter = `?nome=${nome}`;
    const response = await fetch(`${API_URL}/${filter}`);
    const data = await response.json();
  
    return data;
    }
  
  const ShowByEmail = async (email) => {
      const filter = `?email=${email}`;
      const response = await fetch(`${API_URL}/${filter}`);
      const data = await response.json();
  
      return data[0];
  }

  export const UserService = {
      Get,
      Create,
      CreateUser,
      Show,
      ShowByName,
      ShowByEmail,
      Delete,
      Update
  }

