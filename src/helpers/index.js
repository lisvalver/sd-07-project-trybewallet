export default async function fetchCurrency() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const ObjJson = await fetch(endpoint);
  const allCurrency = await ObjJson.json();
  return allCurrency;
}
