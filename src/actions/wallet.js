import * as actionTypes from './actionTypes';

export const addMoney = (money) => ({
  type: actionTypes.ADD_MONEY,
  add: money,
});
export const setCur = (currency) => ({
  type: actionTypes.SET_CURRENCY,
  change: currency,
});
export const addExpense = (expense) => ({
  type: actionTypes.ADD_EXPENSE,
  expense,
});
export const removeExpense = (expenseID) => ({
  type: actionTypes.REMOVE_EXPENSE,
  id: expenseID,
});
export const editExpense = (expense) => ({
  type: actionTypes.EDIT_EXPENSE,
  expense,
});
export const populateCurrencies = (currencies) => ({
  type: actionTypes.POPULATE_CURRENCIES,
  currencies,
});
export const fetchCurrencies = () => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      delete data.USDT;
      const currencies = Object.keys(data);
      dispatch(populateCurrencies(currencies));
    });
};
