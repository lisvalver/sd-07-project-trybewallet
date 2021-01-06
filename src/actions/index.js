// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const ADD_ESPEND = 'ADD_ESPEND';

export const addUser = (email) => ({
  type: ADD_USER,
  email,
});

export const addSpend = (value) => ({
  type: ADD_ESPEND,
  value,
});
