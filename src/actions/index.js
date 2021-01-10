export const changeEmail = (email) => ({
  type: 'LOGIN',
  email,
});

export const addExpenses = (expense) => ({
  type: 'CHANGE',
  expense,
});

export const chargeCurrencies = (currencies) => ({
  type: 'CURRENCIES',
  currencies,
});

const fetchSuccess = (currencies) => ({
  type: 'FETCH_SUCCESS',
  payload: {
    ...currencies,
  },
});

export function fetchCurrencies() {
  return async (dispatch) => {
    const data = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await data.json();
    return dispatch(fetchSuccess(json));
  };
}
