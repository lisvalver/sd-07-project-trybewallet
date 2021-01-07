// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST,
  REQUEST_SUCESS,
  REQUEST_FAILED,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  UPDATE_TOTAL_EXPENSES,
} from '../constants';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
  totalExpenses: 0,
  loading: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  const { expenses, currencies } = state;
  switch (type) {
  case REQUEST:
    return { ...state, loading: true };
  case REQUEST_SUCESS:
    return { ...state, currencies: payload, loading: false };
  case REQUEST_FAILED:
    return { ...state, error: payload.message, loading: false };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, payload] };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: expenses.filter((expen) => expen.id !== payload.id),
    };
  case UPDATE_TOTAL_EXPENSES:
    return {
      ...state,
      totalExpenses: expenses.reduce((acc, { currency, value }) => {
        const { ask } = currencies[currency];
        return acc + (Number(value) * ask);
      }, 0),
    };
  default:
    return state;
  }
};

export default wallet;
