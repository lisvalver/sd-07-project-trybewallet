const CURRENCY_BASE_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrency = async () => {
  const currencyRequest = await fetch(CURRENCY_BASE_API);
  const currencyJson = await currencyRequest.json();

  return currencyJson;
};

export default getCurrency;
