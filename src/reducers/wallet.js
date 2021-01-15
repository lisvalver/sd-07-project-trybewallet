import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES,
  FAILED_REQUEST,
  ADD_EXPENSE,
  TOTAL,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expenseIndex: 0,
  isFetching: false,
  isEditing: false,
  editingId: null,
  error: '',
  total: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, isFetching: true };
  case RECEIVE_CURRENCIES:
    return { ...state, currencies: action.currencies, isFetching: false };
  case FAILED_REQUEST:
    return { ...state, error: action.error, isFetching: false };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      expenseIndex: action.expense.id + 1,
    };
  case SAVE_EXPENSE: {
    const newExpenses = [...state.expenses];
    newExpenses[action.expense.id] = action.expense;
    return {
      ...state,
      expenses: newExpenses,
      isEditing: false,
    };
  }
  case TOTAL: {
    let total = state.expenses
      .reduce(
        (acc, { value, exchangeRates, currency }) => (
          acc + parseFloat(value) * parseFloat(exchangeRates[currency].ask)
        ),
        0,
      );
    total = parseFloat(total.toFixed(2));
    return { ...state, total };
  }
  case DELETE_EXPENSE: {
    const newExpenses = state.expenses.filter(({ id }) => id !== action.id);
    return { ...state, expenses: newExpenses };
  }
  case EDIT_EXPENSE: {
    return { ...state, isEditing: true, editingId: action.id };
  }
  default:
    return state;
  }
}

export default wallet;
