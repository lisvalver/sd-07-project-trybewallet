export const GET_EMAIL = 'GET_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const API_REQUEST = 'API_REQUEST';
export const API_RECEIVE = 'API_RECEIVE';
export const API_RECEIVE_FAIL = 'API_RECEIVE_FAIL';
export const RECEIVE_ALL_DATA = 'RECEIVE_ALL_DATA';

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

export function fetchThunk() {
  return async (dispatch) => {
    try {
      dispatch(apiRequest());
      const fetchApi = await fetch('https://economia.awesomeapi.com.br/json/all');
      const result = await fetchApi.json();
      delete result.USDT;
      dispatch(receiveAllData(result));
      dispatch(apiReceive(result));
    } catch (error) {
      dispatch(apiReceiveFail(error));
    }
  };
}
