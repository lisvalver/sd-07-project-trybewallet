// const selctedCurrencies = 'USD-BRL,CAD-BRL,EUR-BRL,GBP-BRL,ARS-BRL,BTC-BRL,LTC-BRL,JPY-BRL,CHF-BRL,AUD-BRL,CNY-BRL,ILS-BRL,ETH-BRL,XRP-BRL'
// const APIURL = `https://economia.awesomeapi.com.br/json/all/${selctedCurrencies}`
const APIURL = 'https://economia.awesomeapi.com.br/json/all';

const currencyAPI = () => (
  fetch(APIURL)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default currencyAPI;
