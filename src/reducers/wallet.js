import {
  REQUEST_SUCCESS,
  IS_FETCHING,
  CREATE_EXPENSE,
  DELETE_EXPENSE,
  EDIT_START,
  EDIT_END,
  EDIT_EXPENSE_CURRENT,
} from '../actions';

const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  editExpense: false,
  expenseId: 0,
  randomId: 0,
};

const wallet = (state = WALLET_INITIAL_STATE, action) => {
  const updatedExpenses = state.expenses.map((expense) => {
    if (expense.id === Number(state.expenseId)) {
      return { ...expense, ...action.updateExpense };
    }
    return expense;
  });

  switch (action.type) {
  case IS_FETCHING:
    return ({
      ...state,
      isFetching: true,
    });
  case REQUEST_SUCCESS:
    return ({
      ...state,
      isFetching: false,
      currencies: [{ ...action.currencies }],
    });
  case CREATE_EXPENSE:
    return ({
      ...state,
      expenses: [...state.expenses, action.expenses],
      randomId: state.randomId + 1,
    });
  case DELETE_EXPENSE:
    return ({
      ...state,
      expenses: action.expenses,
    });
  case EDIT_START:
    return ({
      ...state,
      editExpense: true,
      expenseId: action.id,
    });
  case EDIT_END:
    return ({
      ...state,
      editExpense: false,
    });
  case EDIT_EXPENSE_CURRENT:
    return ({
      ...state,
      expenses: updatedExpenses,
    });
  default:
    return state;
  }
};

export default wallet;
