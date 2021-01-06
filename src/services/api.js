const getCurrencies = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const { USDT, ...currencies } = data;
  return Object.keys(currencies);
};

const api = {
  getCurrencies,
};

export default api;
