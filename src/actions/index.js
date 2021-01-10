import * as currencyAPI from '../services/api';

const LOGIN = 'LOGIN';
const ADD_EXPENSE = 'ADD_EXPENSE';
const REQUEST_CURRENCY = 'GET_CURRENCY';
const REQUEST_CURRENCY_FAIL = 'REQUEST_CURRENCY_FAIL';

export const signIn = (payload) => ({
  type: LOGIN,
  payload,
});

function requestCurrency() {
  return ({
    type: REQUEST_CURRENCY,
  });
}

function requestCurrencyFail(error) {
  return ({
    type: REQUEST_CURRENCY_FAIL,
    payload: error,
  });
}

export function addExpense(expenseDetails, exchangeRates) {
  return ({
    type: ADD_EXPENSE,
    payload: Object.assign(expenseDetails, { exchangeRates }),
  });
}

export function fetchCurrencyAPI(expenseDetails) {
  return (dispatch) => {
    dispatch(requestCurrency());
    return currencyAPI.getValues()
      .then(
        (exchangeRates) => dispatch(addExpense(expenseDetails, exchangeRates)),
        (error) => dispatch(requestCurrencyFail(error)),
      );
  };
}
