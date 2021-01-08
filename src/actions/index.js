// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const FETCH_API = 'FETCH_API';
export const CURRENCIES = 'CURRENCIES';
export const NEW_EXPENSE = 'NEW_EXPENSE';
export const DELETE = 'DELETE';

export const login = (email) => ({ type: LOGIN, email });

export const fetchAPI = (information) => ({
  type: FETCH_API, payload: { ...information } });

export const currencies = (information) => ({ type: CURRENCIES, payload: information });

export const newExpense = (information) => ({ type: NEW_EXPENSE, payload: information });

export const deleteItem = (information) => ({ type: DELETE, payload: information });

export const getAPI = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const information = await response.json();
  dispatch(fetchAPI(information));
  dispatch(currencies(Object.keys(information)));
};
