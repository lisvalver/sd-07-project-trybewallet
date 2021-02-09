const USER_EMAIL = 'EMAIL';
export const userAction = (email) => ({ type: USER_EMAIL, email });

const CURRENCIES = 'CURRENCIES';
export const actionAddCurrency = (currency) => ({ type: CURRENCIES, currency });

const EXPENSES = 'EXPENSES';
export const actionExpenses = (expense) => ({ type: EXPENSES, expense });

const DELETE = 'DELETE';
export const buttonDelete = (id) => ({ type: DELETE, id });

const EDITE = 'EDITE';
export const Edit = (id) => ({ type: EDITE, id });

export function requestApiAndAnsewrs() {
  return async (dispatch) => {
    const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await resolve.json();
    return dispatch(actionAddCurrency(json));
  };
}
