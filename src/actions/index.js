import getAPI from '../services/walletAPI';

export const ADD_EMAIL = 'ADD_EMAIL';
export const INSERT = 'INSERT';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const REQUEST_EXPENSES = 'REQUEST_EXPENSES';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const GET_CURRENCY = 'GET_CURRENCY';
export const DELETE_ROW = 'DELETE_ROW';

export const addClick = (email) => (
  {
    type: ADD_EMAIL,
    value: email,
  }
);

export const receiveApiSucces = (value) => (
  {
    type: REQUEST_API_SUCCESS,
    value,
  }
);

export const requestCurrency = () => (
  {
    type: REQUEST_CURRENCY,
  }
);

export const requestExpenses = (value) => (
  {
    type: REQUEST_EXPENSES,
    value,
  }
);

export const getCurrency = (value) => (
  {
    type: GET_CURRENCY,
    value,
  }
);

export const deleteRowAction = (value) => (
  {
    type: DELETE_ROW,
    value,
  }
);

export function fetchWallet() {
  return async (dispatch) => {
    dispatch(requestCurrency());
    const jsonData = await getAPI();
    return dispatch(receiveApiSucces(jsonData));
  };
}
