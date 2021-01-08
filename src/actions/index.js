// Coloque aqui suas actions

export function login(string) {
  return ({
    type: 'LOGIN',
    email: string,
  });
}

/*
export const addExpense = (object) => {
  return ({
    type: 'ADD_EXPENSE',
    expense: object
  })
} */

function requestCurrencies() {
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json());
}

function sendExpense(object) {
  return ({
    type: 'ADD_EXPENSE',
    expense: object,
  });
}

export function addExpense(object) {
  return async (dispatch) => {
    const currencies = await requestCurrencies();
    object.exchangeRates = currencies;
    return dispatch(sendExpense(object));
  };
}

export function updateExpenses(array) {
  return ({
    type: 'UPDATE_EXPENSES',
    updatedExpenses: array,
  });
}

/*
function getChar(char) {
  return { type: 'GET_CHAR', payload: char[0] };
}

function requestChar() {
  return { type: 'REQUEST_CHAR' };
}

function failedRequest(error) {
  return { type: 'FAILED_REQUEST', payload: error };
}

export function fetchChar(string) {
  return async (dispatch) => {
    try {
    dispatch(requestChar());
    const char = await charAPI(string);
    return dispatch(getChar(char));
    } catch (error) {
      return dispatch(failedRequest(error));
    }
  };
} */
