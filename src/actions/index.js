export const ADD_EMAIL = 'ADD_EMAIL';

export const addUserEmail = (emailValue) => ({
  type: ADD_EMAIL,
  payload: emailValue,
});
// ------- ACTION TO WALLET ---------------------------------------
export const WAITING_FETCH = 'WAITING_FETCH';
export const GET_FETCHED = 'GET_FETCHED';

function waitingRequest() {
  return { type: WAITING_FETCH };
}

function getRequest(json) {
  return { type: GET_FETCHED, payload: json };
}

function fetchCurrency() {
  return async (dispatch) => {
    dispatch(waitingRequest());

    const currencyRequest = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencyJson = await currencyRequest.json();
    dispatch(getRequest(currencyJson));
  };
}

export default fetchCurrency;
// SECOND ACTION TO WALLET --------------------------------------------
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';

export const updateExpenses = (value, description, currency, method, tag) => ({
  type: UPDATE_EXPENSES,
  payload: {
    value,
    description,
    currency,
    method,
    tag,
  },
});
// THIRD ACTION TO WALLET -----------------------------------------------
export const DELETE_ROW = 'DELETE_ROW';

export const deleteRow = (id) => ({
  type: DELETE_ROW,
  id,
});
