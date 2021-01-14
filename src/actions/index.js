export const LOGIN = 'LOGIN';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES_FAIL = 'REQUEST_CURRENCIES_FAIL';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const login = (email) => ({ type: LOGIN, email });

function requestCurrencies() {
  return { type: REQUEST_CURRENCIES };
}

function requestCurrenciesSuccess(payload) {
  return { type: REQUEST_CURRENCIES_SUCCESS, payload };
}

function requestCurrenciesFail(payload) {
  return { type: REQUEST_CURRENCIES_FAIL, payload };
}

// referência: Daniel Duarte
export function fetchCurrencies() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  return async (dispatch) => {
    dispatch(requestCurrencies());
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      dispatch(requestCurrenciesSuccess(data));
    } catch (error) {
      dispatch(requestCurrenciesFail(error));
    }
  };
}

export const saveExpense = (payload) => ({ type: SAVE_EXPENSE, payload });
