// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export const login = (email, password) => ({
  type: LOGIN,
  email,
  password,
});
