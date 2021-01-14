export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST_SUCESS = 'REQUEST_SUCESS';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const UPDATE_TOTAL = 'UPDATE_TOTAL';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const emailUser = (email) => ({
  type: USER_EMAIL,
  email,
});

const requestSucess = (currencie) => ({
  type: REQUEST_SUCESS,
  currencie,
});

const requestFail = (error) => ({
  type: REQUEST_FAIL,
  error,
});

export const updateTotal = () => ({
  type: UPDATE_TOTAL,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const fetchApi = () => async (dispatch) => {
  try {
    const endpoint = await fetch('https://economia.awesomeapi.com.br/json/all');
    const object = await endpoint.json();
    dispatch(requestSucess(object));
  } catch (error) {
    dispatch(requestFail(error));
  }
};
