import walletTypes from './types';

export const requestCoins = () => ({
  type: walletTypes.REQUEST_COINS,
});

export const getCoins = (currencies, rates) => ({
  type: walletTypes.GET_COINS,
  currencies,
  rates,
});

export const failedRequest = (error) => ({
  type: walletTypes.FAILED_REQUEST,
  error,
});

export const fetchCoins = () => async (dispatch) => {
  try {
    dispatch(requestCoins());

    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const coinsResponse = await fetch(endpoint);
    const coinsJson = await coinsResponse.json();
    const coins = Object.keys(coinsJson).filter((coin) => coin !== 'USDT');

    // console.log("Moedas:", coins);

    dispatch(getCoins(coins, coinsJson));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export const submitExpenses = (values) => ({
  type: walletTypes.SUBMIT_EXPENSES,
  values,
});
