// Coloque aqui suas actions
const addEmail = (email) => ({ type: 'ADD_EMAIL', email });

export const ADD_EXPENSES = 'ADD_EXPENSES';
export const addExpenses = (expenses) => ({ type: ADD_EXPENSES, expenses });

export const FAILED_REQUEST = 'FAILED_REQUEST';
export const failedRequest = (error) => ({ type: FAILED_REQUEST, error });

export const REQUEST = 'REQUEST';
export const request = () => ({ type: REQUEST });

export const ADD_CURRENCY = 'ADD_CURRENCY';
export const addCurrency = (currency) => ({ type: ADD_CURRENCY, currency });

export const ADD_TOTAL = 'ADD_TOTAL';
export const addTotal = (value) => ({ type: ADD_TOTAL, value });

export default addEmail;

export function fetchCurrency(localState, isAddExpense = true) {
  return (dispatch) => {
    dispatch(request());
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    return fetch(URL)
      .then((result) => result.json())
      .then((json) => {
        if (!isAddExpense) {
          return dispatch(addCurrency(Object.keys(json)));
        }
        const addObj = {};
        addObj.exchangeRates = json;
        Object.assign(localState, addObj);
        return dispatch(addExpenses(localState));
      })
      .catch((error) => dispatch(failedRequest(error)));
  };
}
