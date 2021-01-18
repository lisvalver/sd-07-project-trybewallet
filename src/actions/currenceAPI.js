import { addCurrencies } from './wallet.action';

const currenciAPI = () => async (dispatch) => {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await (await (await fetch(endPoint)).json());
  dispatch(addCurrencies(response));
  return response;
};

export default currenciAPI;
