const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  isLoading: false,
};

function wallet(state = INITIAL_STATE, action) {
  const newExpense = [...state.expenses];
  switch (action.type) {
  case 'ADD_EXPENSE':
    return { ...state,
      expenses: [...newExpense, action.value],
      isLoading: false,
      total: (state.total + action.total),
    };
  case 'FETCHING':
    return { ...state, isLoading: true };
  case 'DEL_EXPENSE':
    newExpense.splice(action.id, 1);
    return { ...state, expenses: newExpense };
  case 'EDIT_EXPENSE':
    newExpense[action.value.id] = action.value;
    return { ...state, expenses: newExpense };
  default:
    return state;
  }
}

export default wallet;
