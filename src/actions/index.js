// Coloque aqui suas actions
const SIGN_IN = 'SIGN_IN';

export const signIn = (email) => ({
  type: SIGN_IN,
  payload: email,
});

export const signOut = (user) => ({
  payload: user,
});
