export const addEmail = (email) => ({ type: 'ADD_EMAIL', email });
export const addExpenses = (expenses) => ({ type: 'ADD_EXPENSES', expenses });
export const failedRequest = (error) => ({ type: 'FAILED_REQUEST', error });
export const request = () => ({ type: 'REQUEST' });
export const addCurrency = (currency) => ({ type: 'ADD_CURRENCY', currency });

export function fetchCurrency(localState, isAddExpense = true) {
  return (dispatch) => {
    dispatch(request);
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
