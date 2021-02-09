export const BASE_API = 'https://economia.awesomeapi.com.br/json';

export async function currenciesAPI() {
  const endpoint = `${BASE_API}/all`;
  const response = await fetch(endpoint);
  const results = await response.json();
  const arrayByCurrencies = Object.keys(results);
  return arrayByCurrencies.filter((item) => item !== 'USDT');
}

export async function fetchAll() {
  const endpoint = `${BASE_API}/all`;
  const response = await fetch(endpoint);
  const results = await response.json();
  return results;
}
