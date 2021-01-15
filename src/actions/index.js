// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const ADDEXPENSE = 'ADDEXPENSE';
export const DELEXPENSE = 'DELEXPENSE';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const addExpense = (objectExpense) => ({
  type: ADDEXPENSE,
  objectExpense,
});

export const delExpense = (id) => ({
  type: DELEXPENSE,
  id,
});
