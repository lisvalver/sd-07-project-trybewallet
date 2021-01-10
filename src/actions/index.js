export const LOGIN = 'LOGIN';
export const REQUEST_COINS = 'REQUEST_COINS';
export const RECEIVED_COINS = 'RECEIVED_COINS';
export const READ_COINS = 'READ_COINS';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const RECEIVED_EXCHANGE = 'RECEIVED_EXCHANGE';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

const requestCoins = () => ({
  type: REQUEST_COINS,
});

const recievedCoins = () => ({
  type: RECEIVED_COINS,
});

const readCoins = (data) => ({
  type: READ_COINS,
  currencies: Object.keys(data).filter((curr) => curr !== 'USDT'),
});

const receivedExchanges = (data) => ({
  type: RECEIVED_EXCHANGE,
  exchangeRates: data,
});

const catchError = (error) => ({
  type: REQUEST_ERROR,
  currencies: [error],
});
export function fetchApiThunk() {
  return async (dispatch) => {
    dispatch(requestCoins());
    try {
      const responseAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
      const jsonResponseAPI = await responseAPI.json();
      dispatch(recievedCoins());
      dispatch(readCoins(jsonResponseAPI));
      dispatch(receivedExchanges(jsonResponseAPI));
    } catch (error) {
      dispatch(catchError(error));
    }
  };
}

// async function fetchCurrencyExchangeAPI() {
//   const responseAPI = await fetch('https://economia.awesomeapi.com.br/json/all ');
//   const jsonResponseAPI = await responseAPI.json();

//   return jsonResponseAPI;
// // }
// export default function fetchCoins() {
//   return async (dispatch) => {
//     dispatch(requestCoins());
//     const jsonCoins = await fetchApiThunk();
//     dispatch(recievedCoins());
//     dispatch(readCoins(jsonCoins));
//   };
// }
