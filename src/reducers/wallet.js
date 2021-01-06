import { GET_CURRENCIES } from '../actions';
import { ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CURRENCIES:
      return { ...state, currencies: action.currencies };
    case ADD_EXPENSE:
      return { ...state, expenses: action.expense };
    default:
      return state;
  }
};

export default wallet;
