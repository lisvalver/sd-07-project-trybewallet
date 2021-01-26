// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currency: '',
  expenses: [],
  description: '',
  method: 'Dinheiro',
  tag: 'Alimentação',
  apiFetch: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSES:
    return { expenses: action.addExpenses };
  default:
    return state;
  }
};

export default walletReducer;
