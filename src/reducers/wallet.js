import types from '../actions/types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  sum: 0,
};

const idd = -1;
let id = idd;

export default function Wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.USER_CURRENCIES: {
    return {
      ...state, currencies: [...action.currencie],
    };
  }
  case types.USER_EXPENCIES: {
    id += 1;
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.expenses, id, exchangeRates: action.currencie }],
    };
  }
  case types.USER_VALUE: {
    return {
      ...state, sum: action.sumValue,
    };
  }
  default: {
    return state;
  }
  }
}
