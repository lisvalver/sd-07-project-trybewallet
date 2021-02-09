// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DEL_EXPENSES = 'DEL_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const ADD_EDIT_EXPENSE = 'ADD_EDIT_EXPENSE';

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

export const editExpensesToStore = (editExpenses, idExpense) => ({
  type: EDIT_EXPENSES,
  editExpenses,
  idExpense,
});

export const addEditExpenses = (expense, id) => ({
  type: ADD_EDIT_EXPENSE,
  expense,
  id,
});
