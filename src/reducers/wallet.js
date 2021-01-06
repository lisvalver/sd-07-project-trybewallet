const INITIAL_STATE = {
  expenses: [],
  isFetching: false,
  error: {
    failed: false,
    error: '',
  },
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_EXPENSES':
    return { ...state, isFetching: true };
  case 'ADD_EXPENSES':
    return { ...state, expenses: [...state.expenses, action.value], isFetching: false };
  case 'FAILED_REQUEST':
    return { ...state, error: { failed: true, error: action.value }, isFetching: false };
  default:
    return state;
  }
}

export default wallet;
