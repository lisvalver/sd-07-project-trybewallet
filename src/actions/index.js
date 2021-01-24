import apiCurrency from '../services/apiCurrency';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_PASSWORD = 'SAVE_PASSWORD';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const savePassword = (password) => ({
  type: SAVE_PASSWORD,
  password,
});

export const saveExpenses = () => ({
  type: SAVE_EXPENSES,
});

export const requestCurrency = (currency) => ({
  type: REQUEST_CURRENCY,
  currency,
});

export function fetchCurrency() {
  return async (dispatch) => {
    dispatch(requestCurrency());

    const jsonData = await apiCurrency();
    const currency = Object.keys(jsonData);
    currency.splice(1, 1);
    dispatch(requestCurrency(currency));
  };
}
