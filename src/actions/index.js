// Coloque aqui suas actions
import types from './types';

export const changeEmail = (email) => ({
  type: types.CHANGE_EMAIL,
  email,
});

export const requestCoin = (payload) => ({
  type: 'teste',
  payload,
});
