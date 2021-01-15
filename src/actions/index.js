export const LOGIN_USER = 'LOGIN_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const CURRENCY = 'CURRENCY';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';

const BASE_API = 'https://economia.awesomeapi.com.br/json/all';

export const login = (email) => ({
  type: LOGIN_USER,
  email,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export function fetchCurrencies() {
  return (dispatch) => { // thunk declarado
    dispatch(requestCurrencies());
    return fetch(BASE_API)
      .then((response) => response.json())
      .then((currencies) => dispatch(receiveCurrencies(currencies)));
  };
}
