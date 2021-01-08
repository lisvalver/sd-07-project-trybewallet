import apiCurrency from '../services/apiCurrency';

export const CREATE_EMAIL = 'CREATE_EMAIL';
export const CREATE_EXPENSE = 'CREATE_EXPENSE';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const IS_FETCHING = 'IS_FETCHING';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_START = 'EDIT_START';
export const EDIT_END = 'EDIT_END';
export const EDIT_EXPENSE_CURRENT = 'EDIT_EXPENSE_CURRENT';

export const sendEmail = (email) => (
  {
    type: CREATE_EMAIL,
    email,
  }
);

export const sendExpense = (expenses) => (
  {
    type: CREATE_EXPENSE,
    expenses,
  }
);

const isFetching = () => (
  {
    type: IS_FETCHING,
  }
);

const requestSuccess = (currencies) => (
  {
    type: REQUEST_SUCCESS,
    currencies,
  }
);

export const deleteExpense = (expenses) => (
  {
    type: DELETE_EXPENSE,
    expenses,
  }
);

export const editExpenseStart = (id) => (
  {
    type: EDIT_START,
    id,
  }
);

export const editExpenseEnd = () => (
  {
    type: EDIT_END,
  }
);

export const editCurrentExpense = (updateExpense) => (
  {
    type: EDIT_EXPENSE_CURRENT,
    updateExpense,
  }
);

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(isFetching());
    const currencies = await apiCurrency();
    dispatch(requestSuccess(currencies));
  };
}
