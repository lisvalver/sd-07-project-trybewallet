// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import types from '../actions/types';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
  total: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.TESTE:
    return { currencies: action.payload };
  default:
    return state;
  }
}

export default wallet;
