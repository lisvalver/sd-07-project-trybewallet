// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { NEW_EXPENSE } from '../actions';

const INITIAL_STATE_WALLET = {
  expenses: [],
  randomId: 0,
};

const wallet = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case NEW_EXPENSE:
    return ({
      expenses: [...state, action.expenses],
    });
  default:
    return state;
  }
};

export default wallet;
