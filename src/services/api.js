export async function fetchCurrencies() {
  const data = await fetch('https://economia.awesomeapi.com.br/json/all');
  const dataJson = await data.json();
  return dataJson;
}

export async function fetchCurrency(currencyCode) {
  return currencyCode;
}
