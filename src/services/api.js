const CURRENCY_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrency = async () => {
  const currencyRequest = await fetch(CURRENCY_API);
  const currencyJson = await currencyRequest.json();

  return currencyJson;
};

export default getCurrency;
