export const SAVE_EMAIL = 'SAVE_EMAIL';
export const EXPENSES_TO_SAVE = 'EXPENSE_TO_SAVE';
export const FETCHING = 'IS_FETCHING';
export const SUCESSFUL_FETCH = 'SUCESSFUL_FETCH';
export const EXPENSE_TO_DELETE = 'EXPENSE_TO_DELETE';

export function saveEmail(email) {
  return {
    type: SAVE_EMAIL,
    email,
  };
}

export function deleteExpenseAction(indexExpenseToDelete) {
  return {
    type: EXPENSE_TO_DELETE,
    indexExpenseToDelete,
  };
}

function Fetching() {
  return { type: FETCHING };
}

function sucessfulFetch(currencies) {
  return {
    type: SUCESSFUL_FETCH,
    currencies,
  };
}
export function upDateCurrencies() {
  return async (dispatch) => {
    dispatch(Fetching());

    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(sucessfulFetch(currencies)));
  };
}

export function expenseToSave(expense) {
  return async (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => {
      dispatch({
        type: EXPENSES_TO_SAVE,
        expenseToSave: {
          ...expense,
          exchangeRates: currencies,
        },
      });
      dispatch(sucessfulFetch(currencies));
    });
}
