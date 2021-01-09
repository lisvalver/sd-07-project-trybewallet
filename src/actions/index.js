import getAPI from '../services/walletAPI';

export const ADD_EMAIL = 'ADD_EMAIL';
export const INSERT = 'INSERT';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';

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

export function fetchWallet() {
  return async (dispatch) => {
    dispatch(requestCurrency());
    const jsonData = await getAPI();
    dispatch(receiveApiSucces(jsonData));
  };
}
