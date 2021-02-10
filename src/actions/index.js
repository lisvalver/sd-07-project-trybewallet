import apiCurrency from '../services/apiCurrency';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_PASSWORD = 'SAVE_PASSWORD';
export const SAVE_ADD_EXPENSES = 'SAVE_ADD_EXPENSES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const TOTAL_EXPENSES = 'TOTAL_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const savePassword = (password) => ({
  type: SAVE_PASSWORD,
  password,
});

export const saveAddExpenses = (expenses) => ({
  type: SAVE_ADD_EXPENSES,
  expenses,
});

export const totalExpenses = (totalValue) => ({
  type: TOTAL_EXPENSES,
  totalValue,
});

export const deleteExpenses = (idExpense) => ({
  type: DELETE_EXPENSES,
  idExpense,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const failedRequest = (error) => ({
  type: REQUEST_FAILED,
  error,
});

export function fetchCurrencies(object) {
  return async (dispatch) => {
    try {
      const response = await apiCurrency();
      // object.currencies = response;
      object.exchangeRates = response;
      dispatch(saveAddExpenses(object));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}
