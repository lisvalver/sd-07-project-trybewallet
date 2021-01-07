import { RECIVE_CURRENCY } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function fetch(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECIVE_CURRENCY:
    return {
      ...state, currencies: action.currencies,
    };
  default:
    return state;
  }
}

export default fetch;
