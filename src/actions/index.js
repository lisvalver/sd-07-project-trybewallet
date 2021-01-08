// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const NEW_EXPENSES = 'NEW_EXPENSES';
export const EXCLUDE_EXPENSE = 'EXCLUDE_EXPENSE';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES_SUCESS = 'RECEIVE_CURRENCIES_SUCESS';
export const RECEIVE_CURRENCIES_FAILURE = 'RECEIVE_CURRENCIES_FAILURE';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const newExpense = (value) => ({
  type: NEW_EXPENSES,
  value,
});

export const excludeExpense = (id) => ({
  type: EXCLUDE_EXPENSE,
  id,
});

export const requestCurrencies = (currencies) => ({
  type: REQUEST_CURRENCIES,
  currencies,
});

export const requestCurrenciesSuccess = (currencies) => ({
  type: RECEIVE_CURRENCIES_SUCESS,
  currencies,
});

export const requestCurrenciesFailure = (err) => ({
  type: RECEIVE_CURRENCIES_FAILURE,
  err,
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
