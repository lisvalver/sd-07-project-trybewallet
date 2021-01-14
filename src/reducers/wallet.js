import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  EDITING_EXPENSE,
  REQUEST_CURRENCIES,
  REQUEST_SUCESS,
  REQUEST_FAIL,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expenseId: 0,
  editingExpense: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  const { type, expense, id, bool } = action;
  switch (type) {
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, expense] };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: [...state.expenses.filter((expen) => (expen.id !== id))] };
  case EDIT_EXPENSE:
    return { ...state,
      editingExpense: bool,
      expenses: [...state.expenses
        .map((expen) => {
          if (expen.id === action.expenseId) {
            return {
              ...expen,
              expense,
            };
          }
          return expen;
        })],
    };
  case EDITING_EXPENSE:
    return { ...state, editingExpense: bool, expenseId: action.expenseId };
  case REQUEST_CURRENCIES:
    return { ...state };
  case REQUEST_SUCESS:
    return { ...state, currencies: { ...action.currencies } };
  case REQUEST_FAIL:
    return { ...state, error: action.error.message };
  default:
    return state;
  }
};

export default wallet;
