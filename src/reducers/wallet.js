import { ADD_EXPENSE, DEL_EXPENSE, ADD_CURRENCY, LOADING } from '../actions';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
  loading: true,
  total: 0,
};

function total(expenses) {
  const calctotal = expenses.reduce((acc, expense) => {
    const { value, currency, exchangeRates } = expense;
    return acc + exchangeRates[currency].ask * value;
  }, 0);
  return Number(calctotal).toFixed(2);
}

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
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
      total: total([...state.expenses, action.expenses]),
    };
  case DEL_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item !== action.expense),
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
