export const EMAIL = 'EMAIL';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ALL_DATA = 'ALL_DATA';
export const RECEIVE_CURRENCY_EXCHANGE = 'RECEIVE_CURRENCY_EXCHANGE';

// user action
export const login = (email) => ({
  type: EMAIL,
  email,
});

// wallet action - vai acontecendo quando clicar no botão de submit do form
export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

// export const allCurrencyData = (allDataObj) => ({
//   type: ALL_DATA,
//   allDataObj,
// });

// ações ligadas a chamada da API das moedas
const failedRequest = (error) => ({
  type: FAILED_REQUEST, payload: error });

const receiveCurrencies = (arrCurrencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies: arrCurrencies });

const currencyExchange = (exchangeData) => ({
  type: RECEIVE_CURRENCY_EXCHANGE,
  exchangeRates: exchangeData });

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      const currenciesResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
      const objCurrencies = await currenciesResponse.json();
      delete objCurrencies.USDT;
      dispatch(receiveCurrencies(Object.keys(objCurrencies)));
      dispatch(currencyExchange(objCurrencies));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}
