// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_MOEDA,
  REQUEST_MOEDA_SUCCESS,
  REQUEST_FAIL,
  ADD_EXPENSES,
  DELET_EXPENSE,
  EDIT_EXPENSE,
  ADD_EDIT_EXPENSE,
} from '../actions/index';

const INICIAL_STATE = {
  currencies: [],
  expenses: [],
  editON: false,
  idEdit: 0,
};

const wallet = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_MOEDA:
    return { ...state, isFetching: true };
  case REQUEST_MOEDA_SUCCESS:
    return { ...state, isFetching: false, currencies: { ...action.success } };
  case REQUEST_FAIL:
    return { ...state, isFetching: false, currencies: { ...action.error } };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case DELET_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.expenseID),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editON: true,
      idEdit: action.expense.id,
    };
  case ADD_EDIT_EXPENSE:
    return {
      ...state,
      editON: false,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.id) {
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
