const API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/pacientes`

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

export const PatientService = {
  Create: (data) => {
    console.log(data)
    return fetchUser(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },

  Get: () => {
    const fetchPatient = async() => {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    }

    return fetchPatient();
},
Show: (id) => {
  return fetchUser(`${API_URL}/${id}`, {
method: "GET",
headers: {
  "Content-Type": "application/json",
},
    });
},

  SearchByUserId: (id) => {
        return fetchUser(`${API_URL}/usuario/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
          });
  },

  Update: (id, data) => {
    return fetchUser(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },
  
  Delete: (id) => {
    return fetchUser(`${API_URL}/${id}`, {
      method: "DELETE",
  });
  },
};