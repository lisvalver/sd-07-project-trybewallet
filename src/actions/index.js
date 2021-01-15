import getCurrency from '../services/issAPI';

export const LOGIN_USER = 'LOGIN_USER';
export const WALLET = 'WALLET';
export const CURRENCY = 'CURRENCY';

export const login = (email) => ({
  type: LOGIN_USER,
  email,
});

export const walletAction = (currencies, expenses) => ({
  type: WALLET,
  currencies,
  expenses,
});

export const apiWallet = (api) => ({
  type: CURRENCY,
  api,
});

export const currencyApi = () => async (dispatch) => {
  const api = await getCurrency();
  dispatch(apiWallet(api));
};
