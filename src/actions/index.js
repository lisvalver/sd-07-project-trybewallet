import getCurrencies from '../services/api';

export const RECEIVE_CURRENCIES_FAILURE = 'RECEIVE_CURRENCIES_FAILURE';
export const RECEIVE_CURRENCIES_SUCCESS = 'RECEIVE_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const LOGIN = 'LOGIN';
export const EXPENSES = 'EXPENSES';
export const EXPENSES_CURRENCY = 'EXPENSES_CURRENCY';
export const EXPENSES_DELETE = 'EXPENSES_DELETE';

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const receiveCurrenciesFailure = (error) => ({
  type: RECEIVE_CURRENCIES_FAILURE,
  error,
});

const receiveCurrenciesSuccess = (currencies) => ({
  type: RECEIVE_CURRENCIES_SUCCESS,
  currencies,
});

export function fetchGetCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return getCurrencies()
      .then((response) => {
        const currencies = [];
        Object.keys(response).forEach((currency) => {
          if (currency !== 'USDT') {
            currencies.push(response[currency]);
          }
        });
        dispatch(receiveCurrenciesSuccess(currencies));
      })
      .catch((error) => dispatch(receiveCurrenciesFailure(error)));
  };
}

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const expensesAction = (expenses) => ({
  type: EXPENSES,
  expenses,
});

export const expensesCurrencyAction = (expense) => ({
  type: EXPENSES_CURRENCY,
  expense,
});

export const deleteExpensesAction = (id) => ({
  type: EXPENSES_DELETE,
  id,
});
