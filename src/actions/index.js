// Coloque aqui suas actions
import getCurrentCurrency from '../services/currencyAPI';

export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_EXPENSES = 'CHANGE_EXPENSES';
export const DELETE_EXPENSES_ROW = 'DELETE_EXPENSES_ROW';
export const TOTAL_EXPENSES = 'TOTAL_EXPENSES';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const CURRENCY_SUCESS = 'CURRENCY_SUCESS';
export const CURRENCY_FAIL = 'CURRENCY_FAIL';
export const REQUEST_CURRENCY_OBJ = 'REQUEST_CURRENCY_OBJ';
export const CURRENCY_OBJ_SUCESS = 'CURRENCY_OBJ_SUCESS';
export const CURRENCY_OBJ_FAIL = 'CURRENCY_OBJ_FAIL';

export const changeEmail = (email) => ({
  type: CHANGE_EMAIL,
  payload: email,
});
export const changePassword = (password) => ({
  type: CHANGE_PASSWORD,
  payload: password,
});
export const changeExpenses = (expenses) => ({
  type: CHANGE_EXPENSES,
  payload: expenses,
});
export const deleteExpensesRow = (payload) => ({
  type: DELETE_EXPENSES_ROW,
  payload,
});
export const changeTotalExpenses = (total) => ({
  type: TOTAL_EXPENSES,
  payload: total,
});
export const requestApiCurrency = () => ({
  type: REQUEST_CURRENCY,
});
export const currencyToStoreSucess = (currencies) => ({
  type: CURRENCY_SUCESS,
  payload: currencies,
});
export const currencyToStoreFail = (error) => ({
  type: CURRENCY_FAIL,
  error,
});
export const requestApiCurrencyObj = () => ({
  type: REQUEST_CURRENCY_OBJ,
});
export const currencyObjToStoreSucess = (currencies) => ({
  type: CURRENCY_OBJ_SUCESS,
  payload: currencies,
});
export const currencyObjToStoreFail = (error) => ({
  type: CURRENCY_OBJ_FAIL,
  error,
});

export function requestCurrency() {
  return (dispatch) => {
    dispatch(requestApiCurrency());
    return getCurrentCurrency()
      .then(
        (data) => {
          const results = Object.keys(data);
          const currencies = results.filter((item) => item !== 'USDT');
          dispatch(currencyToStoreSucess(currencies));
        },
        (error) => dispatch(currencyToStoreFail(error)),
      );
  };
}

export function requestCurrencyObject() {
  return (dispatch) => {
    dispatch(requestApiCurrencyObj());
    return getCurrentCurrency()
      .then(
        (data) => {
          dispatch(currencyObjToStoreSucess(data));
        },
        (error) => dispatch(currencyObjToStoreFail(error)),
      );
  };
}
