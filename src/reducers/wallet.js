const INITIAL_STATE = {
  currencies: {},
  expenses: [],
  edit: false,
  editExpenses: {},
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
  case 'EDIT_EXPENSES':
    return { ...state,
      edit: state.expenses.some(({ id }) => id === action.id),
      editExpenses: { ...state.expenses.find(({ id }) => id === action.id) } };
  case 'IS_EDIT':
    return { ...state,
      expenses: [...action.expense],
      edit: false,
      editExpenses: {} };

  default:
    return state;
  }
}

export default wallet;
