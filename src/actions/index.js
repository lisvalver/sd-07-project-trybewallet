export const login = (email) => ({
  type: 'LOGIN',
  email,
});

export const dataFetched = (data) => ({
  type: 'DATA_FETCHED',
  payload: { ...data },
});

export const storeCurrencies = (data) => ({
  type: 'STORE_CURRENCIES',
  payload: [...data],
});

export const getCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(dataFetched(data));
  dispatch(storeCurrencies(Object.keys(data)));
};
