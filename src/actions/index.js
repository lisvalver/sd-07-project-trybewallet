const ADD_EMAIL = 'ADD_EMAIL';
const ADD_CURRENCY = 'ADD_CURRENCY';
const ADD_EXPENSES = 'ADD_EXPENSES';

export const addEmail = (value) => ({ type: ADD_EMAIL, value });

export const addExpensesAction = (expense) => ({ type: ADD_EXPENSES, expense });

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

export default { addEmail, fetchCurrencyAction, addExpensesAction };
