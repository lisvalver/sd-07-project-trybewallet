import { ADD_EXPENSES } from '../actions/index';

const initialState = [];

function reducer(state = initialState, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    return action.expenses;
  default:
    return state;
  }
}

export default reducer;
