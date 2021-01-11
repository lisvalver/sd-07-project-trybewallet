const INITIAL_STATE = {
  currencies: {},
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_CURRENCY':
    return { ...state, currencies: { ...action.payload } };
  case 'ADD_EXPENSES':
    return { ...state, expenses: [...state.expenses, action.expense] };
  default:
    return state;
  }
}

export default wallet;
