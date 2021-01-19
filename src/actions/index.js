const ADD_EMAIL = 'ADD_EMAIL';
const ADD_EXPENSE = 'ADD_EXPENSE';
const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

export const addEmail = (value) => ({ type: ADD_EMAIL, value });

export const addExpense = (value) => ({ type: ADD_EXPENSE, value });

export const removeExpense = (value) => ({ type: REMOVE_EXPENSE, value });

export const updateExpense = (index, value) => ({ type: UPDATE_EXPENSE, index, value });

export function getExpenseCurrency(expense) {
  return async (dispatch) => {
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((r) => r.json()
        .then((json) => {
          expense.exchangeRates = json;
          dispatch(addExpense(expense));
        }));
  };
}
