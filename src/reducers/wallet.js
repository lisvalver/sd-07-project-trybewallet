// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { ADD_EXPENSE, REMOVE_EXPENSE, SAVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};
function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: action.expense };
  case REMOVE_EXPENSE:
    return { ...state, expenses: action.expense }; // é pra ser tudo igual mesmo?
  case SAVE_EXPENSES:
    return { ...state, expenses: action.expenses };
  default:
    return state;
  }
}
export default wallet;
