// Coloque aqui suas actions
import fetchCurrency from '../helpers';

export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const UPDATE_CURRENCIES = 'UPDATE_CURRENCIES';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

const updateCurrency = (exchangeRates) => ({
  type: UPDATE_CURRENCIES,
  exchangeRates,
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
