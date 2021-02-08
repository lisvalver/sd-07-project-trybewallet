import types from '../actions/types';

const WALLET_INITIAL_VALUE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = WALLET_INITIAL_VALUE, action) => {
  switch (action.type) {
  case types.ANY:
    return state;
  default:
    return state;
  }
};

export default wallet;
