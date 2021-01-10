import types from './types';

export const login = (email) => ({
  type: types.LOGIN,
  email,
});

export const addExpense = (expense) => ({
  type: types.ADD_EXPENSE,
  expense,
});

export const deleteExpense = (expenseId) => ({
  type: types.DELETE_EXPENSE,
  expenseId,
});

const requestCoins = () => ({
  type: types.REQUEST_COINS,
});

const recievedCoins = () => ({
  type: types.RECEIVED_COINS,
});

const readCoins = (data) => ({
  type: types.READ_COINS,
  currencies: Object.keys(data).filter((curr) => curr !== 'USDT'),
});

const receivedExchanges = (data) => ({
  type: types.RECEIVED_EXCHANGE,
  exchangeRates: data,
});

const catchError = (error) => ({
  type: types.REQUEST_ERROR,
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
