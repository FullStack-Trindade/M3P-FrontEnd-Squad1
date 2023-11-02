export const CEP_URL = 'http://viacep.com.br/ws/cepConsulta/json/'

const Get = async (cep) => {
    const response = await fetch(CEP_URL.replace('cepConsulta', cep));
    const data = await response.json();

    return data;
   }


export const CEPService = {
    Get,
  
}