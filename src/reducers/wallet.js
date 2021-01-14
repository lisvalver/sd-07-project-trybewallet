// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_SUCESS, REQUEST_FAIL, UPDATE_TOTAL, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: {},
  totalExpenses: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_SUCESS:
    return { ...state, currencies: action.currencie };
  case REQUEST_FAIL:
    return { ...state, error: action.error.message };
  case UPDATE_TOTAL:
    return {
      ...state,
      totalExpenses: state.expenses.reduce((acc, expense) => {
        const { ask } = state.currencies[expense.currency];
        return acc + (expense.value * ask);
      }, 0),
    };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expense] };
  default:
    return state;
  }
};
export default wallet;
