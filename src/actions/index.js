const ADD_EMAIL = 'ADD_EMAIL';
const ADD_CURRENCY = 'ADD_CURRENCY';
const ADD_EXPENSES = 'ADD_EXPENSES';
const DEL_EXPENSES = 'DEL_EXPENSES';
const EDIT_EXPENSES = 'EDIT_EXPENSES';
const IS_EDIT = 'IS_EDIT';

export const addEmail = (value) => ({ type: ADD_EMAIL, value });

export const addExpensesAction = (expense) => ({ type: ADD_EXPENSES, expense });

export const delExpensesAction = (id) => ({ type: DEL_EXPENSES, id });

export const editExpensesAction = (id) => ({ type: EDIT_EXPENSES, id });

export const isEditAction = (expense) => ({ type: IS_EDIT, expense });

function currencyUpdate(json) {
  return { type: ADD_CURRENCY, payload: json };
}

export function fetchCurrencyAction() {
  return async (dispatch) => {
    dispatch(currencyUpdate());
    const currencyResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencyJson = await currencyResponse.json();

    return dispatch(currencyUpdate(currencyJson));
  };
}

export default { addEmail,
  fetchCurrencyAction,
  addExpensesAction,
  delExpensesAction,
  editExpensesAction,
  isEditAction };
