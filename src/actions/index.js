export const LOGIN = 'LOGIN';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const TOTAL = 'TOTAL';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const login = (value) => ({ type: LOGIN, value });

const requestCurrencies = () => ({ type: REQUEST_CURRENCIES });
const failedRequest = (error) => ({ type: FAILED_REQUEST, error });
const receiveCurrencies = (currencies) => (
  { type: RECEIVE_CURRENCIES, currencies }
);

export const fetchCurrencies = () => async (dispatch) => {
  try {
    dispatch(requestCurrencies());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    delete json.USDT;
    dispatch(receiveCurrencies(json));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

const addExpense = (expense) => ({ type: ADD_EXPENSE, expense });
const total = () => ({ type: TOTAL });

export const fetchAddExpense = (expense) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    delete json.USDT;
    const newExpense = { ...expense, exchangeRates: json };
    dispatch(addExpense(newExpense));
    dispatch(total());
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export const deleteExpense = (id) => ({ type: DELETE_EXPENSE, id });
