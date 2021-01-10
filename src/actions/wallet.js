export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
// export const FETCH_SUCCESS = 'FETCH_SUCCESS';

export const addCurrencies = (currencies) => (
  { type: ADD_CURRENCIES, currencies }
);
export const addExpenses = (expense) => (
  { type: ADD_EXPENSE, expense }
);
export const eraseExpense = (expense) => ({
  type: 'DELETE_EXPENSE', expense,
});

// 2 - criar action creators para cada situação da requisição API

// function fetchSuccess(currencies) {
//   return {
//     type: FETCH_SUCCESS,
//     currencies,
//   };
// }
