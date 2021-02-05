// Coloque aqui suas actions
// organização retirada do meu colega de grupo Alvaro projeto 19
export const LOGIN = 'LOGIN';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';
export const NEW_EXPENSE = 'NEW_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';

export const emailUser = (email) => ({
  type: LOGIN,
  email,
});

export const requestCurrencies = () => ({ type: REQUEST_CURRENCY });

const fetchSuccess = (currencies) => ({ type: FETCH_SUCCESS, currencies });
const fetchFail = (error) => ({ type: FETCH_FAIL, error });

export const fetchData = () => async (dispatch) => {
  try {
    dispatch(requestCurrencies);
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    dispatch(fetchSuccess(currencies));
  } catch (error) {
    dispatch(fetchFail(error));
  }
};

export const newExpense = (value) => ({
  type: NEW_EXPENSE, value,
});


