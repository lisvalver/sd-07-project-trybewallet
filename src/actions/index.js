// Coloque aqui suas actions
export const loginAction = (email) => ({
  type: 'LOGIN',
  email,
});

export const currencyAction = (currency) => ({
  type: 'CURRENCY',
  currency,
});

export const fetchingAPI = async (dispatch) => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endpoint);
  const data = await response.json();
  console.log(data);
  dispatch(currencyAction(data));
  return data;
};

export const newExpenseAction = (expense) => ({
  type: 'ADD_EXPENSE',
  payload: expense,
});
