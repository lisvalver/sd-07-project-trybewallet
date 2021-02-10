import currencyAPI from '../services/currencyAPI';
import { response } from '../tests/mockData';

export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const ADD_CURRENCY = 'ADD_CURRENCY';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const addExpense = (expense, total) => ({
  type: ADD_EXPENSE,
  expense,
  total,
});

export const removeExpense = (expense, total) => ({
  type: REMOVE_EXPENSE,
  expense,
  total,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});

export const addCurrency = (currencies) => ({
  type: ADD_CURRENCY,
  currencies,
});

export const sendCurrencyThunk = () => (dispatch) => {
  currencyAPI()
    .then((currencies) => dispatch(addCurrency(currencies)));
};

export const sendCurrencyMock = () => (dispatch) => dispatch(addCurrency(response));
