export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const requestCurrencies = (currencies) => ({
  type: REQUEST_CURRENCIES,
  payload: currencies,
});

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const requestStarted = () => ({ type: REQUEST_STARTED });

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const addExpense = (expense) => ({ type: ADD_EXPENSE, expense });

export const REQUEST_FAIL = 'REQUEST_FAIL';
export const requestFail = (error) => ({ type: REQUEST_FAIL, error });

export function fetchExchangeRates() {
  return async (dispatch) => {
    try {
      dispatch(requestStarted());
      const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
      const exchanges = await fetchAPI.json();
      const currencies = Object.keys(exchanges);
      const filteredCurrencies = currencies.filter((currency) => currency !== 'USDT');
      dispatch(requestCurrencies(filteredCurrencies));
    } catch (erro) {
      console.log(erro);
      dispatch(requestFail());
    }
  };
}
