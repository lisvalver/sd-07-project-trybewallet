// prettier-ignore
export function fetchAllCurrencies() {
  return new Promise((resolve) => {
    fetch(
      'https://economia.awesomeapi.com.br/all/',
    ).then((response) => resolve(response.json()));
  });
}

export function fetchCurrency(currencyCode) {
  return new Promise((resolve) => {
    fetch(
      `https://economia.awesomeapi.com.br/${currencyCode}`,
    ).then((response) => resolve(response.json()));
  });
}
