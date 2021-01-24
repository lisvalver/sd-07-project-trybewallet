import fetchCurrency from '../APIs';

export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const UPDATE_CURRENCIES = 'UPDATE_CURRENCIES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const addEmail = (event) => ({
  type: 'EMAIL',
  value: event,
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

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
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
