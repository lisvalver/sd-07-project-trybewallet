// Coloque aqui suas actions
import { CLICK_UPDATE_EMAIL_VALUE, EXPENSES_UPDATE_VALUE } from './actionTypes';

export const loginButton = (email) => ({
  type: CLICK_UPDATE_EMAIL_VALUE,
  payload: email,
});

export const walletCurrency = (currency) => ({
  type: EXPENSES_UPDATE_VALUE,
  currencies: currency,
});
