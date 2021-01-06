export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const logIn = (user) => ({ type: LOGIN, payload: user });

export const addExpense = (expense) => ({ type: ADD_EXPENSE, payload: expense });

export const createExpense = (expense) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  expense.exchangeRates = data;
  return dispatch(addExpense(expense));
};
