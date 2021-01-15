export const USER_EMAIL = 'USER_EMAIL';
export const ADD_EXPENSE = 'CREATE_EXPENSE';
export const START_REQUEST = 'START_REQUEST';
export const SUCCESS_REQUEST = 'SUCCESS_REQUEST';
export const FAIL_REQUEST = 'FAIL_REQUEST';
export const REQUEST_EXCHANGES = 'REQUEST_EXCHANGES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const emailUser = (email) => ({
  type: USER_EMAIL,
  email,
});

export const startRequest = () => ({
  type: START_REQUEST,
});

export const successRequest = (data) => ({
  type: SUCCESS_REQUEST,
  currencies: Object.keys(data).filter((currency) => currency !== 'USDT'),
});

export const failRequest = (error) => ({
  type: FAIL_REQUEST,
  error,
});

export const requestExchanges = (addExpense, data) => ({
  type: REQUEST_EXCHANGES,
  exchangeRates: data,
  addExpense,
});

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});

export function fetchAPICurrencies() {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const api = await fetch('https://economia.awesomeapi.com.br/json/all');
      const json = await api.json();
      dispatch(successRequest(json));
    } catch (error) {
      console.log(error);
      dispatch(failRequest(error));
    }
  };
}

export function fetchAPIExchanges(addExpense) {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const api = await fetch('https://economia.awesomeapi.com.br/json/all');
      const json = await api.json();
      dispatch(requestExchanges(addExpense, json));
    } catch (error) {
      console.log(error);
      dispatch(failRequest(error));
    }
  };
}
