import { ADD_EXPENSE,
  API_RECEIVE,
  API_REQUEST,
  API_RECEIVE_FAIL,
  RECEIVE_ALL_DATA,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  EDIT_DATA,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
  id: 0,
  exchangeRates: {},
  editMode: false,
  editItem: {},
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
  case EDIT_EXPENSE:
    return { ...state, editMode: true, editItem: action.editItem };
  case EDIT_DATA:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.editDataUpdate.id) {
          return action.editDataUpdate;
        }
        return expense;
      }),
    };
  default:
    return state;
  }
}

export default wallet;
