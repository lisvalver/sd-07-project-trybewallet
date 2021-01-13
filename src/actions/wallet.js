export const ADD_EXPENSES = 'ADD_EXPENSES';

export const addExpenses = (expense) => ({
  type: ADD_EXPENSES,
  expense,
});

export const REQUEST = 'REQUEST';

const request = () => ({
  type: REQUEST,
});

export const SUCCESSFULLY_RECEIVED = 'SUCCESSFULLY_RECEIVED';

const successfullyReceived = (currencies) => ({
  type: SUCCESSFULLY_RECEIVED,
  currencies: Object.keys(currencies),
});

export const EXCHANGE = 'EXCHANGE';

const exchangeReceived = (exchange) => ({
  type: EXCHANGE,
  exchangeRates: exchange,
});

export const SUCCESSFULLY_ERROR = 'SUCCESSFULLY_ERROR';

const errorReceived = (error) => ({
  type: SUCCESSFULLY_ERROR,
  currencies: [error],
});

export function thunkApi() {
  return async (dispatch) => {
    try {
      dispatch(request());
      const currencies = await fetch('https://economia.awesomeapi.com.br/json/all');
      const result = await currencies.json();
      const deleted = 'USDT';
      delete result[deleted];
      dispatch(exchangeReceived(result));
      dispatch(successfullyReceived(result));
    } catch (error) {
      dispatch(errorReceived(error));
    }
  };
}
