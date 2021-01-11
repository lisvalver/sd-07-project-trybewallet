const BASE_API = 'https://economia.awesomeapi.com.br';

const getAPI = async () => {
  try {
    const currencyRequest = await fetch(`${BASE_API}/json/all`);
    const currencyJson = await currencyRequest.json();
    return currencyJson;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default getAPI;
