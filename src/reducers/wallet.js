// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_EXPENSE, UPDATE_TOTAL_EXPENSE, UPDATE_EXPENSE_TABLE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  nextId: 0,
  totalExpenses: 0,
  expensesTable: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE: {
    const value = state.expenses;
    const newValue = [action.value];
    return { ...state,
      expenses: value.concat(newValue),
      nextId: state.nextId + 1,
    };
  }
  case UPDATE_TOTAL_EXPENSE: {
    const sum = state.totalExpenses + action.value;
    return { ...state, totalExpenses: sum };
  }
  case UPDATE_EXPENSE_TABLE: 
    return { ...state, expensesTable: action.value };
  default:
    return state;
  }
}

export default wallet;
