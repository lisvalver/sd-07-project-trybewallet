// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  NEW_EXPENSES,
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES_SUCESS,
  RECEIVE_CURRENCIES_FAILURE,
  EXCLUDE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  currencies: {},
  expenses: [],
  error: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.value] };
  case REQUEST_CURRENCIES:
    return { ...state, isFetching: true };
  case RECEIVE_CURRENCIES_SUCESS:
    return { ...state, isFetching: false, currencies: { ...action.currencies } };
  case RECEIVE_CURRENCIES_FAILURE:
    return { ...state, isFetching: false, error: action.err.message };
  case EXCLUDE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.id)],
    };
  default:
    return state;
  }
};

export default walletReducer;
