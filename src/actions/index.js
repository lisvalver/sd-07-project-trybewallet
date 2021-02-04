// Coloque aqui suas actions
import { getCurrencyV3, getCurrencyV4 } from '../services/currencyAPI';

export const LOGIN = 'LOGIN';

export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const RECEIVE_CURRENCY_SUCCESS = 'RECEIVE_CURRENCY_SUCCESS';
export const RECEIVE_CURRENCY_FAILURE = 'RECEIVE_CURRENCY_FAILURE';

export const COMPLETE_EXPENSES = 'COMPLETE_EXPENSES';

export const login = (email, password) => ({
  type: LOGIN,
  email,
  password,
});

const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
});

const receiveCurrencySuccess = (exchangeRates) => ({
  type: RECEIVE_CURRENCY_SUCCESS,
  exchangeRates,
});

const receiveCurrencyFailure = (error) => ({
  type: RECEIVE_CURRENCY_FAILURE,
  error,
});

export function fetchCurrency() {
  return (dispatch) => {
    dispatch(requestCurrency());
    return getCurrencyV3()
      .then(
        (exchangeRates) => dispatch(receiveCurrencySuccess(exchangeRates)),
        (error) => dispatch(receiveCurrencyFailure(error)),
      );
  };
}

export const completeExpenses = (fullData) => ({
  type: COMPLETE_EXPENSES,
  fullData,
});

export function expensesWithExchangeRates(expensesData) {
  console.log(expensesData);
  return async (dispatch) => {
    dispatch(requestCurrency());
    try {
      const exchangeRates = await getCurrencyV4();
      expensesData.exchangeRates = exchangeRates;
      dispatch(completeExpenses(expensesData));
    } catch (error) {
      dispatch(receiveCurrencyFailure(error));
    }
  };
}
