// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';

export const addUserEmail = (emailValue) => ({
  type: ADD_EMAIL,
  payload: emailValue,
});
