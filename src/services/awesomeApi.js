const AWESOME_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrentCurrency = async () => {
  const currencyRequest = await fetch(AWESOME_API);
  const currencyJson = currencyRequest.json();
  return currencyJson;
};

export default getCurrentCurrency;
