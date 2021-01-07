const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: '',
  loading: false,
  id: 1,
};
const FAILED_REQUEST = 'FAILED_REQUEST';
const ADD_EXPENSES = 'ADD_EXPENSES';
const REQUEST = 'REQUEST';
function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    action.expenses.id = state.id;
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
      id: state.id + 1,
      loading: false,
    };
  case FAILED_REQUEST:
    return { ...state, error: action.error, loading: false };
  case REQUEST:
    return { ...state, loading: true, erro: '' };
  default:
    return state;
  }
}
export default wallet;
