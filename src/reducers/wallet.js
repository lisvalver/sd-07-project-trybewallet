// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCHING, FETCH_SUCCESS, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
  exchangeRates: {},
  fetching: false,
  total: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCHING:
    return {
      ...state,
      currencies: { ...state.currencies },
      expenses: [...state.expenses],
      fetching: true,
    };
  case FETCH_SUCCESS:
    return {
      ...state,
      currencies: { ...action.data },
      expenses: [...state.expenses],
      fetching: false,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.value),
    };
  default:
    return state;
  }
};

export default walletReducer;
