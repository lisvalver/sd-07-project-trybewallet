export const login = (value) => ({ type: 'LOGIN', value });
export const fetchRequest = () => ({ type: 'FETCH_REQUEST' });
export const fetchFail = (value) => ({ type: 'FETCH_FAIL', value });
export const fetchCurrenciesSuccess = (value) => (
  { type: 'FETCH_CURRENCIES_SUCCESS', value });
export const fetchExchangeRatesSuccess = (value) => (
  { type: 'FETCH_EXCHANGE_RATES_SUCCESS', value });
export const updateTotal = (value) => ({ type: 'UPDATE_TOTAL', value });

async function fetchAPI() {
  const api = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(api);
  const data = await response.json();
  return data;
}

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(fetchRequest());
    return fetchAPI()
      .then((data) => dispatch(fetchCurrenciesSuccess(
        Object.keys(data).filter((currency) => currency !== 'USDT'),
      )),
      (error) => dispatch(fetchFail(error)));
  };
}

export function fetchExchangeRates({ value, description, currency, method, tag, total }) {
  return (dispatch) => {
    dispatch(fetchRequest());
    return fetchAPI()
      .then((data) => {
        const exchangeRate = data[`${currency}`].ask;
        const totalResult = total + value * exchangeRate;
        dispatch(fetchExchangeRatesSuccess({
          value,
          description,
          currency,
          method,
          tag,
          exchangeRates: data }));
        dispatch(updateTotal({ totalResult }));
      },
      (error) => dispatch(fetchFail(error)));
  };
}
