const ISS_BASE_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrency = async () => {
  const api = await fetch(`${ISS_BASE_API}/iss-now.json`);
  const jsonAPI = await api.json();
  return jsonAPI;
};

export default getCurrency;
