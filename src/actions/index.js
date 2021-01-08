// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});
export const removeExpense = (expense) => ({
  type: REMOVE_EXPENSE,
  expense,
});

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
  expenses,
});
