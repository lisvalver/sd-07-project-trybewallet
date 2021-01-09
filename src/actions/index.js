export const LOGIN = 'LOGIN';
export const login = (email) => ({ type: LOGIN, email });

export const EXCLUDE_EXPENSE = 'EXCLUDE_EXPENSE';
export const excludeExpenses = (expense) => ({ type: EXCLUDE_EXPENSE, expense });

export const IS_EDITED = 'IS_EDITED';
export const isEdited = (id) => ({ type: IS_EDITED, id });

export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const editExpenses = (expense) => ({ type: EDIT_EXPENSE, expense });

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const addExpenses = (expense) => ({ type: ADD_EXPENSE, expense });

export const ADD_EXCHANGE_RATE = 'ADD_EXCHANGE_RATE';
export const addExchangeRate = (exchangeRate) => ({
  type: ADD_EXCHANGE_RATE,
  exchangeRate,
});

export const REQUEST_EXCHANGE_RATE = 'REQUEST_EXCHANGE_RATE';
export const requestExchangeRates = () => ({ type: REQUEST_EXCHANGE_RATE });

export const FAILED_REQUEST = 'FAILED_REQUEST';
export const failedRequests = (error) => ({ type: FAILED_REQUEST, payload: error });

export function fetchAPI(localState, isAddExpense = true) {
  return (dispatch) => {
    dispatch(requestExchangeRates());
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    return fetch(URL)
      .then((result) => result.json())
      .then((json) => {
        if (!isAddExpense) {
          return dispatch(addExchangeRate(Object.keys(json)));
        }
        const addObj = {};
        addObj.exchangeRates = json;
        Object.assign(localState, addObj);
        return dispatch(addExpenses(localState));
      })
      .catch((error) => dispatch(failedRequests(error)));
  };
}
