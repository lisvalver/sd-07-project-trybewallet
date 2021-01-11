import {
  REQUEST_CURRENCIES,
  ADD_EXPENSE,
  REQUEST_STARTED,
  REQUEST_FAIL,
  REQUEST_EXCHANGES } from '../actions/wallet';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
  controlId: 0,
  rates: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, currencies: action.payload, isLoading: false };
  case REQUEST_EXCHANGES:
    return { ...state, rates: action.payload };
  case ADD_EXPENSE:
    action.expense.id = state.controlId;
    action.expense.exchangeRates = state.rates;
    return { ...state,
      expenses: [...state.expenses, action.expense],
      controlId: state.controlId + 1,
    };
  case REQUEST_STARTED:
    return { ...state, isLoading: true };
  case REQUEST_FAIL:
    return { ...state, isLoading: false };
  case types.DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.expenseId)],
    };
  default:
    return state;
  }
};

export default wallet;
