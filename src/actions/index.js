// Coloque aqui suas actions
const ADD_USER = 'ADD_USER';
const ADD_EXPENSE = 'ADD_EXPENSE';
const ADD_CURRENCY = 'ADD_CURRENCY';
const DEL_EXPENSE = 'DEL_EXPENSE';

export { ADD_USER, ADD_EXPENSE, ADD_CURRENCY, DEL_EXPENSE };

export const LOGIN = (email) => ({ type: ADD_USER, email });

export const CURRENCY = (currency) => ({ type: ADD_CURRENCY, currency });

export const EXPENSE = (expense) => ({ type: ADD_EXPENSE, expense });

export const DELEXPENSE = (id) => ({ type: DEL_EXPENSE, id });
// Object.keys(currencies)
// .filter((coin) => coin !== 'USDT')
