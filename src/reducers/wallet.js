import types from '../actions/types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  controlId: 0,
  rates: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.REQUEST_COINS:
    return {
      ...state, isFetching: true,
    };
  case types.RECEIVED_COINS:
    return {
      ...state, isFetching: false,
    };
  case types.READ_COINS:
    return {
      ...state, currencies: action.currencies,
    };
  case types.REQUEST_ERROR:
    return {
      ...state, currencies: action.currencies,
    };
  case types.ADD_EXPENSE:
    action.expense.id = state.controlId;
    action.expense.exchangeRates = state.rates;
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      controlId: state.controlId + 1,
    };
  case types.DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((exp) => exp.id !== action.expenseId)],
    };
  case types.RECEIVED_EXCHANGE:
    return { ...state, rates: action.exchangeRates };
  default:
    return state;
  }
}
