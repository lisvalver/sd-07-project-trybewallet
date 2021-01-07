export const RECEIVE_WALLET_FAILURE = 'RECEIVE_WALLET_FAILURE';
export const RECEIVE_WALLET_SUCCESS = 'RECEIVE_WALLET_SUCCESS';
export const REQUEST_WALLET = 'REQUEST_WALLET';
export const LOGIN = 'LOGIN';

/*
const requestWallet = () => ({
  type: REQUEST_WALLET,
});

const receiveWalletFailure = (error) => ({
  type: RECEIVE_WALLET_FAILURE,
  error,
});

const receiveWalletSuccess = (wallet) => ({
  type: RECEIVE_WALLET_SUCCESS,
  wallet,
});
 */

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});
