import apiCurrency from '../services/apiCurrency';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_PASSWORD = 'SAVE_PASSWORD';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REQUEST_API = 'REQUEST_API';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const savePassword = (password) => ({
  type: SAVE_PASSWORD,
  password,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const requestCurrency = (currency) => ({
  type: REQUEST_API,
  currency,
});

export function requestApi() {
  return async (dispatch) => {
    dispatch(requestCurrency());

    const jsonData = await apiCurrency();
    const currency = Object.keys(jsonData);
    currency.splice(1, 1);
    dispatch(requestCurrency(currency));
  };
}
