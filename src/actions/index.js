// Coloque aqui suas actions
import * as api from '../services/api';

const SIGN_IN = 'SIGN_IN';
const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
const EXPENSES = 'EXPENSES';
const TOTAL = 'TOTAL';

export const signIn = (email) => ({
  type: SIGN_IN,
  email,
});

export const sumTotal = (total) => ({
  type: TOTAL,
  total,
});

const populateCurrencies = (data) => ({
  type: FETCH_CURRENCIES,
  data,
});

export function populateCurrenciesApi() {
  return async (dispatch) => {
    const data = await api.fetchCurrencies();
    dispatch(populateCurrencies(data));
  };
}

export const saveExpenses = (
  value,
  description,
  currency,
  method,
  tag,
  data,
) => ({
  type: EXPENSES,
  value,
  description,
  currency,
  method,
  tag,
  data,
});

export function fetchRates(value, description, currency, method, tag) {
  return async (dispatch) => {
    const data = await api.fetchCurrencies();
    console.log(data);
    dispatch(saveExpenses(value, description, currency, method, tag, data));
  };
}
