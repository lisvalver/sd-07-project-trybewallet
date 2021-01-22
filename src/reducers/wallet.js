import { SAVE_EXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, { type, expenses }) {
  switch (type) {
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, expenses] };
  default:
    return state;
  }
}

export default wallet;
