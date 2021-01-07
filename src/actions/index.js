export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const login = (user) => ({ type: LOGIN, payload: user });

export const addExpense = (expense) => ({ type: ADD_EXPENSE, payload: expense });

export const createExpense = (expense) => async (dispatch) => {
  const response = await fetch('ttps://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  expense.exchageRates = data;
  return dispatch(addExpense(expense));
};
