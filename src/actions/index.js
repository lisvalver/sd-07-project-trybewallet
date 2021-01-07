// Coloque aqui suas actions

export const SET_EMAIL = 'SET_EMAIL';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const setEmail = (email) => ({
  type: SET_EMAIL,
  email,
});

export const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  currencies,
});

export const setExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export function getCurrencies() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currenciesObj) => Object.entries(currenciesObj))
    .then((currencies) => dispatch(setCurrencies(currencies)));
}

export function addExpense(expense) {
  return async (dispatch) => {
    await dispatch(getCurrencies());
    await dispatch(setExpense(expense));
  };
}
