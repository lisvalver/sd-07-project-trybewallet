export const ADD_LOGIN = 'ADD_LOGIN';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const RECIVE_CURRENCY = 'RECIVE_CURRENCY';

export const addLoginAction = (email) => ({
  type: ADD_LOGIN,
  email,
});

const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
});

const reciveCurrency = (currencies) => ({
  type: RECIVE_CURRENCY,
  currencies,
});

export function fetchCurrency() {
  return (dispatch) => {
    dispatch(requestCurrency());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(reciveCurrency(currencies)));
  };
}
