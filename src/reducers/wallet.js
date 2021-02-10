// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  SAVE_ADD_EXPENSES,
  REQUEST_CURRENCIES,
  GET_CURRENCIES,
  TOTAL_EXPENSES,
  DELETE_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: '',
  expenses: [],
  totalExpenses: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
      totalExpenses: action.total,
    };
  case TOTAL_EXPENSES:
    return {
      ...state, totalExpenses: action.totalValue,
    };
  case DELETE_EXPENSES:
    return ({
      ...state, expenses: state.expenses.filter(({ id }) => id !== action.idExpense),
    });
  case REQUEST_CURRENCIES:
    return {
      ...state, isFetching: true,
    };
  case GET_CURRENCIES:
    return {
      ...state, currencies: action.currencies,
    };
  default:
    return state;
  }
};

export default walletReducer;
