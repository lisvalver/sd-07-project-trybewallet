import { ADD_EXPENSE,
  API_RECEIVE,
  API_REQUEST,
  API_RECEIVE_FAIL,
  RECEIVE_ALL_DATA,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
  id: 0,
  exchangeRates: {},
};

// solução para criar novas chaves no expense e colocar = ao estado que eu queria foi tirado de um grupo
// de estudo feito sobre o requisito;
function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    action.expense.id = state.id;
    action.expense.exchangeRates = state.exchangeRates;
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      id: state.id + 1 };
  case API_REQUEST:
    return { ...state, loading: true };
  case API_RECEIVE:
    return { ...state, currencies: action.currency, loading: false };
  case API_RECEIVE_FAIL:
    return { ...state, currencies: action.error, loading: false };
  case RECEIVE_ALL_DATA:
    return { ...state, exchangeRates: action.exchangeRates };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id) };
  default:
    return state;
  }
}

export default wallet;
