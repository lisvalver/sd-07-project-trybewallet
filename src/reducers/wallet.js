const INITIAL_STATE = {
  total: 0,
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  const newExpense = [...state.expenses];
  switch (action.type) {
  case 'ADD_EXPENSE':
    return {
      expenses: [...newExpense, action.value],
      total: state.total + action.total,
    };
  case 'EDIT_EXPENSE':
    newExpense[action.value.id] = action.value;
    return { ...state, expenses: newExpense };
  case 'DEL_EXPENSE':
    newExpense.splice(action.id, 1);
    return { ...state, expenses: newExpense };
  default:
    return state;
  }
}

export default wallet;
