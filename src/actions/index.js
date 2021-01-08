// Coloque aqui suas actions
import * as api from '../services/api';

const SIGN_IN = 'SIGN_IN';
const CURRENCIES = 'CURRENCIES';
const EXPENSES = 'EXPENSES';
// const CURRENCIES_EXPENSES = 'CURRENCIES_EXPENSES';

export const signIn = (email) => ({
  type: SIGN_IN,
  payload: email,
});

const readCurrencies = (currencies) => ({
  type: CURRENCIES,
  payload: currencies,
});

// const putCurrenciesOnExpenses = (currencies) => ({
//   type: CURRENCIES_EXPENSES,
//   payload: currencies,
// });

export function fetchCurrenciesThunk() {
  return async (dispatch) => {
    const data = await api.fetchAllCurrencies();
    dispatch(readCurrencies(data));
  };
}

export const putExpenses = (value, description, currency, method, tag) => ({
  type: EXPENSES,
  value,
  description,
  currency,
  method,
  tag,
});
