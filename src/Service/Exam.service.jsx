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