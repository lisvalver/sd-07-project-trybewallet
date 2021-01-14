import apiWallet from '../services/api';

export const EMAIL_LOGIN = 'EMAIL_LOGIN';
export const NEW_EXPENSE = 'NEW_EXPENSE';
export const FETCHING = 'FETCHING';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const emailLogin = (email) => (
  {
    type: EMAIL_LOGIN,
    email,
  }
);

export const newExpense = (expenses) => (
  {
    type: NEW_EXPENSE,
    expenses,
  }
);

export const deleteExpense = (expenses) => (
  {
    type: DELETE_EXPENSE,
    expenses,
  }
);

const fetching = () => (
  {
    type: FETCHING,
  }
);

const requestSuccess = (currencies) => (
  {
    type: REQUEST_SUCCESS,
    currencies,
  }
);

export function currencyApi() {
  return async (dispatch) => {
    dispatch(fetching());
    const currencies = await apiWallet();
    dispatch(requestSuccess(currencies));
  };
}
