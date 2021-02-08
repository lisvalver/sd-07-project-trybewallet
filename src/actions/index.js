export const GET_EMAIL = 'GET_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const API_REQUEST = 'API_REQUEST';
export const API_RECEIVE = 'API_RECEIVE';
export const API_RECEIVE_FAIL = 'API_RECEIVE_FAIL';
export const RECEIVE_ALL_DATA = 'RECEIVE_ALL_DATA';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_DATA = 'EDIT_DATA';

export const getEmail = (email) => ({
  type: GET_EMAIL,
  email,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const apiRequest = () => ({
  type: API_REQUEST,
});

export const apiReceive = (currency) => ({
  type: API_RECEIVE,
  currency: Object.keys(currency),
});

export const apiReceiveFail = (error) => ({
  type: API_RECEIVE_FAIL,
  error: [error],
});

export const receiveAllData = (exchangeRates) => ({
  type: RECEIVE_ALL_DATA,
  exchangeRates,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const editExpense = (editItem) => ({
  type: EDIT_EXPENSE,
  editItem,
});

export const editData = (editDataUpdate) => ({
  type: EDIT_DATA,
  editDataUpdate,
});

export function fetchThunk() {
  return async (dispatch) => {
    try {
      dispatch(apiRequest());
      const fetchApi = await fetch('https://economia.awesomeapi.com.br/json/all');
      const result = await fetchApi.json();
      delete result.USDT;
      dispatch(apiReceive(result));
      dispatch(receiveAllData(result));
    } catch (error) {
      dispatch(apiReceiveFail(error));
    }
  };
}
