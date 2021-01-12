const InitialState = {
  expenses: [],
  currencies: [],
};

function wallet(state = InitialState, action) {
  switch (action.type) {
  case 'GET_CURRENCY':
    return { ...state, currencies: action.currenciesApi };
  case 'ADD_EXPENSE':
    return {
      ...state, expenses: [...state.expenses, action.addExpense],
    };
  default:
    return state;
  }
}

export default wallet;
