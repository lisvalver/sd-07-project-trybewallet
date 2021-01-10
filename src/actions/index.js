export const USER_LOGIN = 'USER_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export { default as validator } from './validation';
export { default as fetchCurrencies } from './fetchCurrencies';

export const login = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});
