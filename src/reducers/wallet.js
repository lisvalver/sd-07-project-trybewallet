// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET, CURRENCY } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  api: {},
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case WALLET:
    return {
      ...state,
      currencies: action.currencies,
      expenses: action.expenses,
    };
  case CURRENCY:
    return {
      ...state,
      api: action.api,
    };
  default:
    return state;
  }
}

export default wallet;
