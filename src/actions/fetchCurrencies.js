export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';

const getCurrencies = (payload) => (
  { type: GET_CURRENCIES, payload }
);

const requestCurrencies = () => (
  { type: REQUEST_CURRENCIES }
);

const failedRequest = (error) => (
  { type: FAILED_REQUEST, payload: error }
);

const getFetch = (url) => fetch(url).then((element) => element.json());

export default function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    try {
      const url = 'https://economia.awesomeapi.com.br/json/all';
      const currencies = await getFetch(url);
      dispatch(getCurrencies(currencies));
    } catch (err) { dispatch(failedRequest(err)); }
  };
}
