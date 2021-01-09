export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

export function apiFetchThunk() {
  return async (dispatch) => {
    try {
      dispatch(request());
      const requestCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
      const result = await requestCurrencies.json();
      delete result['USDT'];
      dispatch(receiveSuccess(result));
    } catch (error) {
      dispatch(receiveError(error));
    }
  }
}

const request = () => ({
  type: 'REQUEST',
})

const receiveSuccess = (exchangeData) => ({
  type: 'RECEIVE_SUCCESS',
  currencies: Object.keys(exchangeData),
})

const receiveError = (error) => ({
  type: 'RECEIVE_ERROR',
  currencies: [error],
})
