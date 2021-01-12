export const USER_EMAIL = 'USER_EMAIL';
export const ADD_EXPENSE = 'CREATE_EXPENSE';
export const START_REQUEST = 'START_REQUEST';
export const SUCCESS_REQUEST = 'SUCCESS_REQUEST';
export const FAIL_REQUEST = 'FAIL_REQUEST';
export const REQUEST_EXCHANGES = 'REQUEST_EXCHANGES';

export const emailUser = (email) => ({
  type: USER_EMAIL,
  email,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const startRequest = () => ({
  type: START_REQUEST,
});

export const successRequest = (data) => ({
  type: SUCCESS_REQUEST,
  currencies: Object.keys(data).filter((currencie) => currencie !== 'USDT'),
});

export const failRequest = (error) => ({
  type: FAIL_REQUEST,
  error,
});

export const requestExchanges = (data) => ({
  type: REQUEST_EXCHANGES,
  exchangeRates: data,
});

export function fetchAPIExchanges() {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const api = await fetch('https://economia.awesomeapi.com.br/json/all');
      const json = await api.json();
      dispatch(successRequest(json));
      dispatch(requestExchanges(json));
    } catch (error) {
      console.log(error);
      dispatch(failRequest());
    }
  };
}
