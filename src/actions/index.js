export const LOGIN = 'LOGIN';
export const login = (email) => ({ type: LOGIN, email });

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const requestCurrencies = (payload) => ({
  type: REQUEST_CURRENCIES,
  payload,
});

export const FAILED_REQUEST = 'FAILED_REQUEST';
export const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  error,
});

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const addExpense = (expense) => ({ type: ADD_EXPENSE, expense });

// export const DELETE_EXPENSE = 'DELETE_EXPENSE';
// export const deleteExpense = (expense) => ({
//   type: DELETE_EXPENSE,
//   expense,
// });

async function fetchExchangeRates() {
  const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchanges = await fetchAPI.json();
  return exchanges;
}

export const fetchCurrencies = () => async (dispatch) => {
  const exchanges = await fetchExchangeRates();
  const currencies = Object.keys(exchanges);
  const filteredCurrencies = currencies.filter((currency) => currency !== 'USDT');
  dispatch(requestCurrencies(filteredCurrencies));
};
