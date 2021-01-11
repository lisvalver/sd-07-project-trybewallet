export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDITING = 'EDITING';
export const NOT_EDITING = 'NOT_EDITING';
export const HANDLE_EDIT_CHAGE = 'HANDLE_EDIT_CHANGE';
export const ACTUALIZE_EXPENSE = 'ACTUALIZE_EXPENSE';

export const logIn = (user) => ({ type: LOGIN, payload: user });

export const addExpense = (expense) => ({ type: ADD_EXPENSE, payload: expense });

export const createExpense = (expense) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  expense.exchangeRates = data;
  return dispatch(addExpense(expense));
};

export const removeExpense = (id) => ({ type: REMOVE_EXPENSE, payload: id });

export const editExpense = (expense) => ({ type: EDIT_EXPENSE, payload: expense });

export const allowEdition = () => ({ type: EDITING, payload: true });

export const disallowEditing = () => ({ type: NOT_EDITING, payload: false });

export const handleEditChange = (name, value) => ({
  type: HANDLE_EDIT_CHAGE,
  payload: { name, value },
});

export const addActualizedExpense = (expense) => ({
  type: ACTUALIZE_EXPENSE,
  payload: expense,
});

export const actualizeExpense = (expense) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  expense.exchangeRates = data;
  return dispatch(addActualizedExpense(expense));
};
