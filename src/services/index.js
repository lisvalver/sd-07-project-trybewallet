const endpoint = 'https://economia.awesomeapi.com.br/json/all';

export default async function getCurrencies() {
  const response = await fetch(
    endpoint,
  );
  const currencies = await response.json();
  return currencies;
}
