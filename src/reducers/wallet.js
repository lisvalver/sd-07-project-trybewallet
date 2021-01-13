import { WALLET } from '../actions';

const WALLETS = {
  currencies: [],
  expenses: [],
};

function wallet(state = WALLETS, action) {
  switch (action.type) {
  case WALLET:
    return { ...state, currencies: action.currencies, expenses: action.expenses };
  default:
    return state;
  }
}

export default wallet;
