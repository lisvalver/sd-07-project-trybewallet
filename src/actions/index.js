// Coloque aqui suas actions
export const loginAction = (email) => ({
  type: 'LOGIN',
  email,
});

export const currencyAction = (currency) => ({
  type: 'CURRENCY',
  currency,
});

export const fetchingAPI = () => async (dispatch) => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await (await (await fetch(endpoint)).json());
  dispatch(currencyAction(response));
  return response;
};
