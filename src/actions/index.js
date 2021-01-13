// Coloque aqui suas actions

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const addExpenseAction = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const deleteExpenseAction = (id) => ({
  type: 'DELETE_EXPENSE',
  id,
});

export const editingExpenseAction = (editingId, bool) => ({
  type: 'EDITING_EXPENSE',
  editingId,
  bool,
});

export const editedExpenseAction = (expense, bool) => ({
  type: 'EDITED_EXPENSE',
  expense,
  bool,
});

export const login = (email) => ({
  type: 'LOGIN',
  email,
});

export const requestCurrencies = () => ({
  type: REQUEST,
});

const requestSuccess = (currencies) => ({
  type: SUCCESS, currencies,
});

const requestFail = (error) => ({
  type: FAILURE, error,
});

const endPoint = 'https://economia.awesomeapi.com.br/json/all';

export const fetchCurrencies = () => async (dispatch) => {
  try {
    dispatch(requestCurrencies);
    const response = await fetch(endPoint);
    const currencies = await response.json();
    dispatch(requestSuccess(currencies));
  } catch (error) {
    dispatch(requestFail(error));
  }
};
