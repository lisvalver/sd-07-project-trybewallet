export const LOGIN_USER = 'LOGIN_USER';
export const WALLET = 'WALLET';

export const login = (email) => ({
  type: LOGIN_USER,
  email,
});

export const walletAction = (currencies, expenses) => ({
  type: WALLET,
  currencies,
  expenses,
});
