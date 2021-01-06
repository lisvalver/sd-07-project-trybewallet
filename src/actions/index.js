export const login = (email) => ({
  type: 'LOGIN',
  email,
});

export const dataFetched = (data) => ({
  type: 'DATA_FETCHED',
  payload: { ...data },
});

export const getCurrencies = () => async (dispatch) => {
  const response = fetch('https://economia.awesomeapi.com.br/json/all');
  const data = response.json();
  dispatch(dataFetched(data));
};
