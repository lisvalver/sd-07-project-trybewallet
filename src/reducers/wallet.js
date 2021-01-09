import { REQUEST_COINS, RECEIVED_COINS, READ_COINS, ADD_EXPENSE, REQUEST_ERROR } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_COINS:
    return {
      ...state, isFetching: true,
    };
  case RECEIVED_COINS:
    return {
      ...state, isFetching: false,
    };
  case READ_COINS:
    return {
      ...state, currencies: action.currencies,
    };
  case REQUEST_ERROR:
    return {
      ...state, currencies: action.currencies,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  default:
    return state;
  }
}
