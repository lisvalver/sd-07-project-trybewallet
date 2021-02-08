// Coloque aqui suas actions

export const EMAIL = 'EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';

export const sendEmail = (email) => ({
  type: EMAIL,
  email,
});

export const addExpenses = (newExpense, parcial) => ({
  type: ADD_EXPENSES,
  newExpense,
  parcial,
});

export const deleteExpenses = (id) => ({
  type: DELETE_EXPENSES,
  id,
});

export const editExpenses = (editedExpense) => ({
  type: EDIT_EXPENSES,
  editedExpense,
});

export const getCurrencies = (currenciesAPI) => ({
  type: GET_CURRENCIES,
  currenciesAPI,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    const currenciesResponse = await fetch(
      'https://economia.awesomeapi.com.br/json/all',
    );
    const objCurrencies = await currenciesResponse.json();
    delete objCurrencies.USDT;
    dispatch(getCurrencies(Object.keys(objCurrencies)));
  };
}
