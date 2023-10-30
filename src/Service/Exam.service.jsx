const fetchExam = async (url, options) => {
  try {
    const response = await fetch(url, options);
    console.log(response.status);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = response;
    return data;
  } catch (error) {
    console.error("Erro na chamada da API:", error);
    throw error;
  }
};

export const ExamService = {
  Create: (data) => {
    return fetchExam("http://localhost:3000/api/exames", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  Get: () => {
    return fetchExam("http://localhost:3000/api/exames");
  },

  Update: (id, data) => {
    return fetchExam(`http://localhost:3000/api/exames/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },
  Delete: (id) => {
    return fetchExam(`http://localhost:3000/api/exames/${id}`, {
      method: "DELETE",
    });
  },
};
