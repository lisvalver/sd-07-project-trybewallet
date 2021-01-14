export const ADD_EXPENSE = 'ADD_EXPENSE';

export const REQUEST = 'REQUEST';

export const RECEIVE_SUCCESS = 'RECEIVE_SUCCESS';

export const RECEIVE_ERROR = 'RECEIVE_ERROR';

export const EXCHANGE_CURRENCY = 'EXCHANGE_CURRENCY';

export const addExpenseAction = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

const requestAction = () => ({
  type: REQUEST,
});

const receiveSuccessAction = (changeCurrencies) => ({
  type: RECEIVE_SUCCESS,
  currencies: Object.keys(changeCurrencies),
});

const receiveErrorAction = (error) => ({
  type: RECEIVE_ERROR,
  currencies: [error],
});

const exchangeCurrencyAction = (changeCurrencies) => ({
  type: EXCHANGE_CURRENCY,
  exchangeRates: changeCurrencies,
});

export function fetchCurrenciesThunk() {
  return async (dispatch) => {
    try {
      dispatch(requestAction());
      const endpoint = 'https://economia.awesomeapi.com.br/json/all';
      const requestCurrencies = await fetch(endpoint);
      const data = await requestCurrencies.json();
      delete data.USDT; // Função remove a chave indesejada (USDT)
      dispatch(exchangeCurrencyAction(data));
      dispatch(receiveSuccessAction(data));
    } catch (error) {
      return dispatch(receiveErrorAction(error));
    }
  };
}
