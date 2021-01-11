// Coloque aqui suas actions
import * as api from '../services/api';

const SIGN_IN = 'SIGN_IN';
const CURRENCIES = 'CURRENCIES';
const EXPENSES = 'EXPENSES';
const SUM = 'SUM';

export const signIn = (email) => ({
  type: SIGN_IN,
  payload: email,
});

//----------------------------------------------

const readCurrencies = (currencies) => ({
  type: CURRENCIES,
  payload: currencies,
});

export function fetchCurrenciesThunk() {
  return async (dispatch) => {
    const data = await api.fetchAllCurrencies();
    dispatch(readCurrencies(data));
  };
}

//----------------------------------------------

export const putExpenses = (value, description, currency, method, tag, data) => ({
  type: EXPENSES,
  value,
  description,
  currency,
  method,
  tag,
  data,
});

export function fetchExchangeRates(value, description, currency, method, tag) {
  return async (dispatch) => {
    const data = await api.fetchAllCurrencies();
    dispatch(putExpenses(value, description, currency, method, tag, data));
  };
}

//----------------------------------------------

export const sumAll = (total) => ({
  type: SUM,
  payload: total,
});
