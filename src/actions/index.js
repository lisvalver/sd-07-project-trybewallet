// Coloque aqui suas actions
import { LOGIN } from '../reducers/user';

export const loginAction = (email) => ({ type: LOGIN, email });

export const GET_CURRENCE = 'GET_CURRENCES';
export const REQUEST_CURRENCE = 'REQUEST_CURRENCES';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const SAVED_EXPENSE = 'SAVED_EXPENSES ';

export const actionSaved = (expense) => ({ type: SAVED_EXPENSE, expense });

function getCurrences(json) {
  return { type: GET_CURRENCE, payload: json };
}

function requestCurrences() {
  return { type: REQUEST_CURRENCE };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

export function fetchCurrences() {
  return async (dispatch) => {
    try {
      dispatch(requestCurrences());
      const currenceResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currencesJson = await currenceResponse.json();
      return dispatch(getCurrences(
        currencesJson,
      ));
    } catch (error) {
      return dispatch(failedRequest(error));
    }
  };
}
