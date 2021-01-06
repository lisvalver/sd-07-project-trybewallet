// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { ADD_EXPENSE, REMOVE_EXPENSE } from '../actions'
const INITIAL_STATE = {
  currencies: [],
  expenses: []
}
function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
    case (ADD_EXPENSE):
      break;
    case (REMOVE_EXPENSE):
      break;
    default:
      return state;
  }
}
export default wallet