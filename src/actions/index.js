import getCurrency from '../services/api';

export const login = (email, password) => ({
  type: 'USER',
  email,
  password,

});

export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const REQUEST_CURRENCY_SUCCESS = 'RECEIVE_CURRENCY_SUCCESS';

export const requestCurrency = () => ({ type: REQUEST_CURRENCY });

const receiveCurrencySuccess = (currency) => ({
  type: REQUEST_CURRENCY_SUCCESS,
  currency,
});

export function fetchCurrency() {
  return async (dispatch) => {
    dispatch(requestCurrency());
    
    const { currency } = await getCurrency();
    dispatch(receiveCurrencySuccess(currency));
  };
}
