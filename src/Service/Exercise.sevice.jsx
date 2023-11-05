const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/exercicios`

const Get = () => {
  const fetchExarcise = async() => {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data;
  }

  return fetchExarcise();
}

const Create = (exerciseData) => {
  const fetchExarcise = async() => {
      const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( exerciseData )
      })
      
      return response
  }

  return fetchExarcise();
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
  const fetchExarcise = async() => {
      const response = await fetch(`${API_URL}/${ id }`, {
          method: 'DELETE',
      })

      return response
  }

  return fetchExarcise()
}


const Update = (id, data) => {
  const fetchExarcise = async() => {
      const response = await fetch(`${API_URL}/${ id }`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( data )
      })

      return response
  }

  return fetchExarcise()
}



export const ExerciseService = {
    Get,
    Create,
    Show,
    Delete,
    Update
}