// Coloque aqui suas actions
const UPDATE_EMAIL = 'UPDATE_EMAIL';
const SAVE_COINS = 'SAVE_COINS';
const REQUEST_COINS = 'REQUEST_COINS';
const REQUEST_COINS_SUCESS = 'REQUEST_COINS_SUCESS';
const REQUEST_COINS_FAIL = 'REQUEST_COINS_FAIL';

export const email = sendEmail => ({
  type: UPDATE_EMAIL,
  sendEmail,
});

export const coins = payload => ({
  type: SAVE_COINS,
  payload,
});

function requestCoins() {
  return { type: REQUEST_COINS };
}

function requestSucess(payload) {
  return { type: REQUEST_COINS_SUCESS, payload };
}

function requestFail(payload) {
  return { type: REQUEST_COINS_FAIL, payload };
}

export function fetchCoins() {
  return dispatch => {
    dispatch(requestCoins());
    return fetch('https://economia.awesomeapi.com.br/json/all').then(response =>
      response
        .json()
        .then(data => dispatch(coins(data)))
        .then(data => dispatch(requestSucess(data)))
        .catch(error => dispatch(requestFail(error))),
    );
  };
}

export const typesActions = {
  UPDATE_EMAIL,
  SAVE_COINS,
  REQUEST_COINS,
  REQUEST_COINS_SUCESS,
  REQUEST_COINS_FAIL,
};
