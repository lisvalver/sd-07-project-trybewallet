// Coloque aqui suas actions
import types from './types';

export const changeEmail = (email) => ({
  type: types.CHANGE_EMAIL,
  email,
});

export const teste = (payload) => ({
  type: types.TESTE,
  payload,
});
