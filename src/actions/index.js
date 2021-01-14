export const LOGIN = 'LOGIN';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDITING_EXPENSE = 'EDITING_EXPENSE';

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_SUCESS = 'REQUEST_SUCESS';
export const REQUEST_FAIL = 'REQUEST_FAIL';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const addExpenseAct = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const deleteExpenseAct = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const editExpenseAct = (expense, bool) => ({
  type: EDIT_EXPENSE,
  expense,
  bool,
});

export const editingExpenseAct = (expenseId, bool) => ({
  type: EDITING_EXPENSE,
  expenseId,
  bool,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const reqCurrenciesSucess = (currencies) => ({
  type: REQUEST_SUCESS,
  currencies,
});

export const reqCurrenciesFail = (error) => ({
  type: REQUEST_FAIL,
  error,
});

export const fetchCurrencies = () => async (dispatch) => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  try {
    dispatch(requestCurrencies);
    const fetchApi = await fetch(endpoint);
    const currencies = await fetchApi.json();
    dispatch(reqCurrenciesSucess(currencies));
  } catch (error) {
    dispatch(reqCurrenciesFail(error));
  }
};
