const UPDATE_EMAIL = 'UPDATE_EMAIL';
const REQUEST_COINS = 'REQUEST_COINS';
const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
const SAVE_EXPENSES = 'SAVE_EXPENSES';
const REQUEST_COINS_FAIL = 'REQUEST_COINS_FAIL';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';
const EDIT_FORM = 'EDIT_FORM';

export const getEmail = (sendEmail) => ({
  type: UPDATE_EMAIL,
  sendEmail,
});

function requestCoins() {
  return { type: REQUEST_COINS };
}

function getAllCoins(payload) {
  return { type: SAVE_CURRENCIES, payload };
}

function getExpenses(form, currencies) {
  return { type: SAVE_EXPENSES, form, currencies };
}

function requestFail(error) {
  return { type: REQUEST_COINS_FAIL, error };
}

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const editExpense = (form) => ({
  type: EDIT_EXPENSE,
  form,
});

export const editForm = () => ({
  type: EDIT_FORM,
});

export function sendCurrencies() {
  return (dispatch) => {
    dispatch(requestCoins());
    return fetch('https://economia.awesomeapi.com.br/json/all').then((response) => response.json()
      .then((data) => dispatch(getAllCoins(Object.keys(data))),
        (error) => dispatch(requestFail(error))));
  };
}

export function sendFormAndExhangesRates(form) {
  return (dispatch) => {
    dispatch(requestCoins());
    return fetch('https://economia.awesomeapi.com.br/json/all').then((response) => response.json().then(
      (currencies) => dispatch(getExpenses(form, currencies)),
      (error) => dispatch(requestFail(error)),
    ));
  };
}

export const typesActions = {
  UPDATE_EMAIL,
  REQUEST_COINS,
  SAVE_CURRENCIES,
  SAVE_EXPENSES,
  REQUEST_COINS_FAIL,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  EDIT_FORM,
};
