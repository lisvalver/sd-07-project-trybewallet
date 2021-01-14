// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  NEW_EXPENSE,
  DELETE_EXPENSE,
  FETCHING,
  REQUEST_SUCCESS,
} from '../actions';

const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
  randomId: 0,
  fetching: false,
};

const wallet = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case FETCHING:
    return ({
      ...state,
      fetching: true,
    });
  case REQUEST_SUCCESS:
    return ({
      ...state,
      fetching: false,
      currencies: [{ ...action.currencies }],
    });
  case NEW_EXPENSE:
    return ({
      expenses: [...state.expenses, action.expenses],
      randomId: state.randomId + 1,
    });
  case DELETE_EXPENSE:
    return ({
      ...state,
      expenses: action.expenses,
    });
  default:
    return state;
  }
};

export default wallet;
