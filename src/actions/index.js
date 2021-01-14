// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export const getLogin = (email, password) => ({
  type: LOGIN,
  email,
  password,
});
