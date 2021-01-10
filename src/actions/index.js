// Coloque aqui suas actions
const LOGIN = 'LOGIN';
const RECEIVE_FAILURE = 'RECEIVE_FAILURE';
const RECEIVE_SUCCESS = 'RECEIVE_SUCCESS';
const REQUEST = 'REQUEST';

const loginActions = (value) => ({ type: LOGIN, value });

const receiveFailure = (error) => ({
  type: RECEIVE_FAILURE,
  error,
});

const receiveSuccess = (value) => ({
  type: RECEIVE_SUCCESS,
  value,
});

const request = () => ({
  type: REQUEST,
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

export { loginActions, fetchCurrency };
