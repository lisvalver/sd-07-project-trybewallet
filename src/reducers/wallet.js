import { EXPENSES_TO_SAVE, FETCHING, SUCESSFUL_FETCH } from '../actions/index';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
    isFetching: true,
  },
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EXPENSES_TO_SAVE:
    return {
      ...state,
      wallet: action.payload,
    };
  case FETCHING:
    return {
      ...state,
      isFetching: true,
    };
  case SUCESSFUL_FETCH:
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  default:
    return state;
  }
}

export default wallet;
