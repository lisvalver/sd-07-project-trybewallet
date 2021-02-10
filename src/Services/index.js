const CURRENCIES_API = 'https://economia.awesomeapi.com.br/json';

const getCurrencies = async () => {
  const response = await fetch(`${CURRENCIES_API}/all`);
  const currencies = await response.json();
  return currencies;
};

export default getCurrencies;
