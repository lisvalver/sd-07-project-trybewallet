// Coloque aqui suas actions
import fetchCurrency from '../helpers';

export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const UPDATE_CURRENCIES = 'UPDATE_CURRENCIES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const login = (email) => ({
  type: LOGIN,
  email,
});

const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

const updateCurrency = (exchangeRates) => ({
  type: UPDATE_CURRENCIES,
  exchangeRates,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export function fetchCurrencyAction(expense) {
  return (dispatch) => fetchCurrency()
    .then(
      (exchangeRates) => dispatch(updateCurrency(exchangeRates)),
    )
    .then(
      () => dispatch(addExpense(expense)),
    );
}
