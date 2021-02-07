export const ADD_EMAIL_USER = 'ADD_EMAIL_USER';
export const REQUEST_SUCESS = 'REQUEST_SUCESS';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const TOTAL_EXPENSES = 'TOTAL_EXPENSES';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';

export const addEmailUser = (name) => ({
  type: ADD_EMAIL_USER,
  payload: name,
});

export const requestSuccess = (payload) => ({
  type: REQUEST_SUCESS,
  payload,
});
export const requestFailed = (error) => ({
  type: REQUEST_SUCESS,
  payload: error,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});

export const totalExpenses = () => ({
  type: TOTAL_EXPENSES,
});

export const saveOrEdit = (id = null) => ({
  type: EDIT_EXPENSES,
  id,
});

export const updateExpenses = (payload) => ({
  type: UPDATE_EXPENSES,
  payload,
});

export const fetchAPI = () => async (dispatch) => {
  try {
    const endpoint = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await endpoint.json();
    // console.log(response);
    dispatch(requestSuccess(response));
  } catch (error) {
    const { message } = error;
    dispatch(requestFailed(message));
  }
};
