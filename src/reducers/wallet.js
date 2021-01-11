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
  case 'DEL_EXPENSES':
    return { ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.id)] };
  default:
    return state;
  }
}

export default wallet;
