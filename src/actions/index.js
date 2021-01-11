// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const UPDATE_TOTAL_EXPENSE = 'UPDATE_TOTAL_EXPENSE';
export const EDIT_INFO = 'EDIT_INFO';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

export const addUser = (email) => ({
  type: ADD_USER,
  email,
});

export const addExpense = (value) => ({
  type: ADD_EXPENSE,
  value,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const updateTotalExpenses = (value) => ({
  type: UPDATE_TOTAL_EXPENSE,
  value,
});

export const editInfo = (id) => ({
  type: EDIT_INFO,
  id,
});

export const updateExpense = (payload) => ({
  type: UPDATE_EXPENSE,
  payload,
});
