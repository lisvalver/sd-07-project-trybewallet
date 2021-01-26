export const LOGIN = 'LOGIN';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const GET_CURRENCY = 'GET_CURRENCY';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
});

export const getCurrency = (currency) => ({
  type: GET_CURRENCY,
  payload: currency,
});

export const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: error,
});

export function fetchCurrency() {
  return async (dispatch) => {
    try {
      dispatch(requestCurrency());
      const apiLink = 'https://economia.awesomeapi.com.br/json/all';
      const currencyResponse = await fetch(apiLink);
      const currencyJson = await currencyResponse.json();
      return dispatch(getCurrency(currencyJson));
    } catch (error) {
      return dispatch(failedRequest(error));
    }
  };
}
