import requestAPI from "../services/requestAPI";

// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';

export const saveEmail = (email) => ({
  type: LOGIN,
  email,
});

// export const requestCurrency = (value) => ({ type: REQUEST_CURRENCY, data: value });

const fetchSuccess = (data) => ({ type: FETCH_SUCCESS, data });
const fetchFail = (error) => ({ type: FETCH_FAIL, error });

export function fetchData() {
  return function (dispatch) {
    return requestAPI().then(
      response => dispatch(fetchSuccess(response)),
      error => dispatch(fetchFail(error))
    );
  }
}
