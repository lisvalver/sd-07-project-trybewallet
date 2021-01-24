const fetchCurrency = async () => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const request = await fetch(URL);
  const response = await request.json();
  return response;
};

export default fetchCurrency;
