// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_CURRENCY,
  FETCH_SUCCESS,
  FETCH_FAIL,
  NEW_EXPENSE,
  DELETE_EXPENSE,
} from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  fetching: false,
  error: '',
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return { ...state, fetching: true };
  case FETCH_SUCCESS:
    return {
      ...state,
      fetching: false,
      currencies: { ...action.currencies },
    };
  case FETCH_FAIL:
    return {
      ...state,
      fetching: false,
      error: action.err.message,
    };
  case NEW_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.value] };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.id)] };
  default: return state;
  }
};

export default wallet;
