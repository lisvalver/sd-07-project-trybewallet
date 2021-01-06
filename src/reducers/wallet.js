import { SET_EDIT_BY_ID, CURRENCY_ID_INCREMENT, EDIT_EXPENSE, DEL_EXPENSE, ADD_EXPENSE, SET_DATA, IS_FETCHING } from '../actions';

const initialState = {
  isFetching: false,
  currencies: [],
  expenses: [],
  editById: -1,
  currencyId: 0,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case IS_FETCHING:
    return { ...state, isFetching: true };
  case SET_DATA:
    return { ...state, currencies: [action.data], isFetching: false };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expense] };
  case DEL_EXPENSE:
    return { ...state, expenses: state.expenses.filter((e) => e.id != action.id) };
  case SET_EDIT_BY_ID:
    return { ...state, editById: action.id };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((e) => {
        if (e.id === action.id) return action.newExpense;
        return e;
      }),
      editById: -1,
    };
  case CURRENCY_ID_INCREMENT:
    return { ...state, currencyId: state.currencyId + 1 };
  default: return state;
  }
};

export default wallet;

// return { ...state, editById: -1 }
