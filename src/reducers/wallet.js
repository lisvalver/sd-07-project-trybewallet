const INITIAL_STATE = {
  currency: [],
  expenses: [],
  error: '',
  loading: false,
  id: 0,
  totalValue: 0,
};
const FAILED_REQUEST = 'FAILED_REQUEST';
const ADD_EXPENSES = 'ADD_EXPENSES';
const REQUEST = 'REQUEST';
const ADD_CURRENCY = 'ADD_CURRENCY';
const ADD_TOTAL = 'ADD_TOTAL';

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    action.expenses.id = state.id;
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
      id: state.id + 1,
      loading: false,
      totalValue: +(parseFloat(state.totalValue + action.expenses.value
        * action.expenses.exchangeRates[action.expenses.currency].ask).toFixed(2)),
    };
  case FAILED_REQUEST:
    return { ...state, error: action.error, loading: false };
  case REQUEST:
    return { ...state, loading: true, erro: '' };
  case ADD_CURRENCY:
    return { ...state, currency: action.currency, loading: false };
  case ADD_TOTAL:
    return { ...state, totalValue: action.value };
  default:
    return state;
  }
}
export default wallet;
