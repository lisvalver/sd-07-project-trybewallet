import {
  ADD_EXPENSE,
  REQUEST_EXCHANGE_RATE,
  FAILED_REQUEST,
  ADD_EXCHANGE_RATE,
  EXCLUDE_EXPENSE,
  EDIT_EXPENSE,
  IS_EDITED,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  nextID: 0,
  loading: false,
  error: '',
  exchangeRateKeys: [],
  isEdit: -1,
};

function wallet(state = INITIAL_STATE, action) {
  // console.log(action.expense)
  switch (action.type) {
  case REQUEST_EXCHANGE_RATE:
    return { ...state, loading: true, error: '' };
  case ADD_EXCHANGE_RATE:
    return { ...state, exchangeRateKeys: action.exchangeRate, loading: false };
  case ADD_EXPENSE:
    action.expense.id = state.nextID;
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      nextID: state.nextID + 1,
      loading: false,
    };
  case IS_EDITED:
    return {
      ...state,
      isEdit: action.id,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.expense.id) {
          return action.expense;
        }
        return expense;
      }),
    };
  case EXCLUDE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.expense.id),
    };
  case FAILED_REQUEST:
    return { ...state, error: action.payload, loading: false };
  default:
    return state;
  }
}

export default wallet;
