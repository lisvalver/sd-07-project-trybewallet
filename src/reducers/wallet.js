import { ADD_EXPENSE, DEL_EXPENSE, ADD_CURRENCY, LOADING } from '../actions';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
  loading: true,
  total: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    // action.expenses.exchange = Number(
    //   state.currencies[action.expenses.currency].ask,
    // ).toFixed(2);
    // action.expenses.conversion = Number(
    //   action.expenses.value,
    // ).toFixed(2) * action.expenses.exchange;
    action.expenses.exchangeRates = { ...state.currencies };
    return { ...state, expenses: [...state.expenses, action.expense] };
  case DEL_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.expense.id),
    };
  case ADD_CURRENCY:
    return { ...state, currencies: action.currencies };
  case LOADING:
    return { ...state, loading: action.loading };
  default:
    return state;
  }
}

export default wallet;
