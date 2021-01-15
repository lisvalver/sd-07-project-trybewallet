// Coloque aqui suas actions
import * as api from '../services/api';

const SIGN_IN = 'SIGN_IN';
const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

export const signIn = (email) => ({
  type: SIGN_IN,
  email,
});

const populateCurrencies = (data) => ({
  type: FETCH_CURRENCIES,
  data,
});

export function populateCurrenciesApi() {
  return async (dispatch) => {
    const data = await api.fetchCurrencies();
    dispatch(populateCurrencies(data));
  };
}
