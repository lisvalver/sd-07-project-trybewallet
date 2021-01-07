// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSES, FAILED_REQUEST, REQUEST } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: [],
  loading: false,
  id: 1,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    action.expenses.id = state.id;
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
      id: state.id + 1,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  case REQUEST:
    return {
      ...state,
      loading: true,
      error: '',
    };
  default:
    return state;
  }
}

export default wallet;
