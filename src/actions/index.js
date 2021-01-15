export const SAVE_EMAIL = 'SAVE_EMAIL';
export const EXPENSES_TO_SAVE = 'EXPENSE_TO_SAVE';
export const FETCHING = 'IS_FETCHING';
export const SUCESSFUL_FETCH = 'SUCESSFUL_FETCH';

export function saveEmail(email) {
  return {
    type: SAVE_EMAIL,
    email,
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
      .then((currencies) => dispatch(sucessfulFetch(Object.keys(currencies)
        .filter((currency) => currency !== 'USDT'))));
  };
}

export function expenseToSave(expense, currencies) {
  return {
    type: EXPENSES_TO_SAVE,
    payload: {
      currencies,
      expense,
    },
  };
}
