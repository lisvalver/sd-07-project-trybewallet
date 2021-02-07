import {
  REQUEST_SUCESS,
  REQUEST_FAILED,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  TOTAL_EXPENSES,
  UPDATE_EXPENSES,
  EDIT_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: 0,
  saveOrEdit: false,
  editId: null,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case REQUEST_SUCESS:
    return { ...state, currencies: action.payload };
  case REQUEST_FAILED:
    return { ...state, error: action.payload };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => action.id !== expense.id),
    };
  case TOTAL_EXPENSES:
    return { ...state,
      totalExpenses: state.expenses.reduce((acc, { exchangeRates, currency, value }) => {
        const total = parseFloat(value * exchangeRates[currency].ask);
        return acc + total;
      }, 0) };
  case EDIT_EXPENSES:
    return { ...state,
      saveOrEdit: !state.saveOrEdit,
      editId: action.id,
    };
  case UPDATE_EXPENSES:
    return { ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return action.payload;
        }
        return expense;
      }),
    };
  default:
    return state;
  }
};

export default wallet;
