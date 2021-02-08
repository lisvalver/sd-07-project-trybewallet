// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DEL_EXPENSES = 'DEL_EXPENSES';

export const emailLogin = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const getCurrenciesToSelectOptions = (getCurrencies) => ({
  type: GET_CURRENCIES,
  getCurrencies,
});

export const addExpensesToStore = (addExpenses) => ({
  type: ADD_EXPENSES,
  addExpenses,
});

export const delExpensesToStore = (id) => ({
  type: DEL_EXPENSES,
  id,
});
