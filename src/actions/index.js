import fetchCurrencyApi from '../services/api';

export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const SEND_EMAIL = 'SEND_EMAIL';
export const GET_EXCHANGE = 'GET_EXCHANGE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const sendEmail = (email) => ({
  type: SEND_EMAIL,
  email,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const addExpense = (expenses, total) => ({
  type: ADD_EXPENSE,
  expenses,
  total,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const fetchExchange = (currenciesObj) => async (dispatch) => {
  const exchangeRates = await fetchCurrencyApi();
  const currentCurrency = exchangeRates[currenciesObj.currency];
  const converted = +currentCurrency.ask * currenciesObj.value;

  dispatch(addExpense({ ...currenciesObj, exchangeRates }, converted));
};
