// Coloque aqui suas actions
const SIGN_IN = 'SIGN_IN';

export const signIn = (user) => ({
  type: SIGN_IN,
  payload: user,
});

export const signOut = (user) => ({
  payload: user,
});
