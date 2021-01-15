export async function fetchCurrencies() {
  const dataCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
  const dataCurrenciesJson = await dataCurrencies.json();
  return dataCurrenciesJson;
}

export async function fetchCurrency(currencyCode) {
  const dataCurrency = await fetch(`https://economia.awesomeapi.com.br/${currencyCode}`);
  const dataCurrencyJson = await dataCurrency.json();
  return dataCurrencyJson;
}
