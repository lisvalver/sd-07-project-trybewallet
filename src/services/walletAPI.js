const BASE_API = 'https://economia.awesomeapi.com.br/';

const getAPI = async () => {
  const currencyRequest = await fetch(`${BASE_API}/json/all`);
  const currencyJson = await currencyRequest.json();
  return currencyJson;
};

export default getAPI;
