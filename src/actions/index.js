export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const LIST_CURRENCIES = 'LIST_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const LOGIN = 'LOGIN';

export const userLogin = (email) => ({
  type: LOGIN,
  email,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const removeExpense = (expense) => ({
  type: REMOVE_EXPENSE,
  payload: expense,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const failedRequest = (error) => ({
  type: REQUEST_FAILED,
  error,
});

export const listCurrencies = (currencies) => ({
  type: LIST_CURRENCIES,
  currencies,
});
