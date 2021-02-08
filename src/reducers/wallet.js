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
  default:
    return state;
  }
}

export default wallet;
