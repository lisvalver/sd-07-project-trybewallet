// Coloque aqui suas actions
import types from './types';

export const changeEmail = (email) => ({
  type: types.CHANGE_EMAIL,
  email,
});

export const fetchingApi = () => ({
  type: types.REQUEST_SUCCES,
});

export const reciveSucces = (value) => ({
  type: types.RECIVE_SUCCES,
  value,
});

export const reciveFail = () => ({
  type: types.RECIVE_FAIL,
});

export const addExpenses = (expenses) => ({
  type: types.ADD_EXPENSES,
  expenses,
});

export const deleteExpenses = (expenses) => ({
  type: types.DELETE_EXPENSES,
  expenses,
});

export const addActionForm = (expenses) => ({
  type: types.ADD_ACTION_FORM,
  expenses,
});

export const fetchCurrence = () => async (dispatch) => {
  try {
    dispatch(fetchingApi);
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    dispatch(reciveSucces(currencies));
  } catch (error) {
    dispatch(reciveFail(error));
  }
};
