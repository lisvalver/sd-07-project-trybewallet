// Coloque aqui suas actions
export const login = (email) => ({
  type: 'LOGIN',
  email,
});

export const expenses = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const requestCurrencies = () => ({
  type: 'REQUEST_ALL_CURRENCIES',
});

export const allCurrencies = (currencies) => ({
  type: 'CURRENCIES',
  currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies);
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currenciesResponse = await request.json();
  dispatch(allCurrencies(currenciesResponse));
};
