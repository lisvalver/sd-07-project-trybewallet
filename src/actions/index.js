// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';

export const emailLogin = (email) => ({
  type: ADD_EMAIL,
  email,
});
