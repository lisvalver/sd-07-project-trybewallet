// Coloque aqui suas actions

export const EXCLUDE_EXPENSE = 'EXCLUDE_EXPENSE';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES_SUCCESS = 'RECEIVE_CURRENCIES_SUCCESS';
export const RECEIVE_CURRENCIES_FAILURE = 'RECEIVE_CURRENCIES_FAILURE';

export const addExpenseAction = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const login = (email) => ({
  type: 'LOGIN',
  email,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const requestCurrenciesSuccess = (currencies) => ({
  type: RECEIVE_CURRENCIES_SUCCESS, currencies,
});

const requestCurrenciesFailure = (error) => ({
  type: RECEIVE_CURRENCIES_FAILURE, error,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    dispatch(requestCurrencies);
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    dispatch(requestCurrenciesSuccess(currencies));
  } catch (error) {
    dispatch(requestCurrenciesFailure(error));
  }
};
