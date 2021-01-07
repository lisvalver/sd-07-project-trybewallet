// Coloque aqui suas actions
const addEmail = (email) => ({ type: 'ADD_EMAIL', email });

export const ADD_EXPENSES = 'ADD_EXPENSES';
export const addExpenses = (expenses) => ({ type: ADD_EXPENSES, expenses });

export const FAILED_REQUEST = 'FAILED_REQUEST';
export const failedRequest = (error) => ({ type: FAILED_REQUEST, error });

export const REQUEST = 'REQUEST';
export const request = () => ({ type: REQUEST });

export default addEmail;
