import * as actionTypes from './actionTypes';

export const addMoney = (money) => {
  return {
    type: actionTypes.ADD_MONEY,
    add: money,
  };
}
export const changeCurrency = (currency) => {
  return {
    type: actionTypes.SET_CURRENCY,
    change: currency,
  };
}
export const addExpense = (expense) => {
  return {
    type: actionTypes.ADD_EXPENSE,
    expense: expense,
  };
}
export const removeExpense = (expenseID) => {
  return {
    type: actionTypes.REMOVE_EXPENSE,
    id: expenseID,
  };
}
export const populateCurrencies = (currencies) => {
  return {
    type: actionTypes.POPULATE_CURRENCIES,
    currencies: currencies,
  }
}
export const fetchCurrencies = () => {
  return dispatch => {
    fetch('https://economia.awesomeapi.com.br/json/all')
    .then(response => response.json())
    .then(data => {
      delete data.USDT;
      const currencies = Object.keys(data);
      dispatch(populateCurrencies(currencies));
    });
  }
}
