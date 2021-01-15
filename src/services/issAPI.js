const BASE_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrency = async () => {
  const api = await fetch(BASE_API);
  const jsonAPI = await api.json();
  return jsonAPI;
};

export default getCurrency;
