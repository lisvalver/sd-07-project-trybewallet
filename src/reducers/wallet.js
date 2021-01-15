import { ADD_EXPENSES, ADD_AMOUNT } from '../actions/index';

const initialState = {
  expenses: [],
  value: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    return { ...state, expenses: action.expenses };
  case ADD_AMOUNT:
    return { ...state, value: action.amount };
  default:
    return state;
  }
}

export default reducer;
