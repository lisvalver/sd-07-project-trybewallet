// Coloque aqui suas actions
import { CLICK_UPDATE_EMAIL_VALUE, CURRENCY_UPDATE_VALUE, EXPENSES_UPDATE_VALUE } from './actionTypes';
import fetchCurrency from '../services/API';

export const loginButton = (email) => ({
  type: CLICK_UPDATE_EMAIL_VALUE,
  payload: email,
});

export const walletCurrency = (currency, rates) => ({
  type: CURRENCY_UPDATE_VALUE,
  currencies: currency,
  rates,

});

export const buttonExpenses = (expense) => ({
  type: EXPENSES_UPDATE_VALUE,
  expense,
});

export const getCurrencies = () => async (dispatch) => {
  const data = await fetchCurrency();
  const currenciesL = Object.keys(data);
  const currencyList = currenciesL.filter((element) => element !== 'USDT');
  dispatch(walletCurrency(currencyList, data));
};
