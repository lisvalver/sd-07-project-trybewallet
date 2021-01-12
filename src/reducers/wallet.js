const INITIAL_STATE = { currencies: [], expenses: [] };

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return { currencies: [], expenses: [...state.expenses, action.value] };
  default:
    return state;
  }
};

export default walletReducer;
