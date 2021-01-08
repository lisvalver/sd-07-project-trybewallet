// Coloque aqui suas actions
import getCurrenciesApi from '../services/CurrencyAPI';

export const EMAIL = "EMAIL";
export const CURRENCIES = "CURRENCIES";
export const EXPENSES = "EXPENSES";

export const GET_CURRENCIES = "GET_CURRENCIES";
export const REQUEST_CURRENCIES = "REQUEST_CURRENCIES";
export const FAILED_REQUEST = "FAILED_REQUEST";

export const saveUserEmail = (payload) => ({
  type: EMAIL,
  payload,
});

const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

const requestCurrencies = () => ({ type: REQUEST_CURRENCIES })

const failedRequest = (error) => ({ type: FAILED_REQUEST, payload: error })

export const fetchCurrencies = () => {
  return async (dispatch) => {
    try {
      console.log('trying')
      dispatch(requestCurrencies);
      let currencyArray = []

      const currenciesRes = await getCurrenciesApi();
      const convertToArray = Object.entries(currenciesRes);
      convertToArray.forEach(currency => currencyArray.push(currency[1]))
      const finalCurrencies = currencyArray.filter(currency => currency.name !== 'Dólar Turismo')

      dispatch(getCurrencies(finalCurrencies))

    } catch (error) {
      return dispatch(failedRequest(error))
    }
  }
}

export const saveExpenseAction = (expense) => {
  return async (dispatch) => {
    try {
      console.log('expense')
      dispatch(requestCurrencies)
      const currenciesRes = await getCurrenciesApi();
    } catch (error) {
      return dispatch(failedRequest(error))
    }
  }
}
