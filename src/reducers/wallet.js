const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  errors: [],
  isFetching: false,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return { ...state, expense: [...state.expenses, action.expenses] };

  case 'UPDATE_EXCHANGE':
    return { ...state, currencies: action.exchange };
  case 'FAILED_REQUEST':
    return { ...state, errors: action.errors, isFetching: false };
  default:

    return state;
  }
}
export default walletReducer;
