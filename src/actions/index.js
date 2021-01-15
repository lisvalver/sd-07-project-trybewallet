export const EMAIL = 'EMAIL';
export const WALLET = 'WALLET';
export const GET_CURRENCY = 'GET_CURRENCY';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const FAILED_REQUEST = 'FAILED_CURRENCY';
export const SEND_OBJECT_EXPENSE = 'SEND_OBJECT_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export function clientAction(email) {
  return {
    type: EMAIL,
    email,
  };
}

export function walletAction(currencies, expenses) {
  return {
    type: WALLET,
    payload: {
      currencies,
      expenses,
    },
  };
}

function getCurrency(json) {
  return {
    type: GET_CURRENCY,
    payload: json,
  };
}

function requestCurrency() {
  return {
    type: REQUEST_CURRENCY,
  };
}

function failedRequest(error) {
  return {
    type: FAILED_REQUEST,
    payload: error,
  };
}

export function sendObjectExpense(objExpense) {
  return {
    type: SEND_OBJECT_EXPENSE,
    payload: objExpense,
  };
}

export function removeObjectExpense(id) {
  return {
    type: REMOVE_EXPENSE,
    payload: id,
  };
}

export function fetchCurrency() {
  return async (dispath) => {
    try {
      dispath(requestCurrency());
      const currencyResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currencyJson = await currencyResponse.json();
      dispath(getCurrency(currencyJson));
    } catch (error) {
      dispath(failedRequest(error));
    }
  };
}
