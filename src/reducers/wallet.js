// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { USER_WALLET_CURRENCIES, USER_WALLET_EXPENSES } from '../actions/index';

const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case USER_WALLET_CURRENCIES:
    return { ...state, currencies: action.currencies };
  case USER_WALLET_EXPENSES:
    return 'aaa';
  default:
    return state;
  }
};

export default wallet;
