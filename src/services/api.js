export default async function fetchCurrencyApi() {
  const API = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(API);
  const json = await response.json();
  return json;
}
