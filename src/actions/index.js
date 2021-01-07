import getCurrencies from '../services';

export const SIGNIN = 'SIGNIN';
export const signIn = (email) => ({ type: SIGNIN, email });

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const requestCurrencies = (currencies) => (
  { type: REQUEST_CURRENCIES, currencies });

export function fetchCurrencies() {
  return async (dispatch) => {
    const response = await getCurrencies();
    const currencies = Object.keys(response);
    const filteredCurrencies = currencies.filter((currency) => currency !== 'USDT');
    dispatch(requestCurrencies(filteredCurrencies));
  };
}

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const addExpense = (expense) => (
  { type: ADD_EXPENSE, expense });
