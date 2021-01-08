import { requestCurrencies, failedRequest, listCurrencies } from '../actions';

const handleCurrencies = (object) => Object.values(object)
  .filter((currency) => currency.name !== 'Dólar Turismo');

const fetchCurrencies = () => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  return async (dispatch) => {
    dispatch(requestCurrencies());
    try {
      const response = await fetch(endpoint);
      const object = await response.json();
      const currencies = handleCurrencies(object);
      dispatch(listCurrencies(currencies));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
};

export default fetchCurrencies;
