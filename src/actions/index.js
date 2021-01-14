// Coloque aqui suas actions
import { LOGIN, RECEIVE_FAILURE, RECEIVE_SUCCESS, REQUEST, ADD } from './type';

const loginActions = (value) => ({ type: LOGIN, value });

const receiveFailure = () => ({
  type: RECEIVE_FAILURE,
});

const receiveSuccess = (value) => ({
  type: RECEIVE_SUCCESS,
  value,
});

const request = () => ({
  type: REQUEST,
});

const add = (expenses) => ({
  type: ADD,
  expenses,
});

const fetchCurrency = () => async (dispatch) => {
  try {
    dispatch(request);
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    dispatch(receiveSuccess(currencies));
  } catch (error) {
    dispatch(receiveFailure(error));
  }
};

export { loginActions, fetchCurrency, add };
