export const loginUser = (value) => ({ type: 'LOGIN', email: value });

export const addExpenseAction = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const updateExchange = (exchange) => ({
  type: 'UPDATE_EXCHANGE',
  exchange: Object.keys(exchange).filter((currency) => currency !== 'USDT'),
});

export const failedRequest = (error) => ({
  type: 'FAILED_REQUEST', error,
});
export const getExchange = () => async (dispatch) => {
  try {
    const apiResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const endJson = await apiResponse.json();
    return dispatch(updateExchange(endJson));
  } catch (error) {
    return dispatch(failedRequest(error));
  }
};
