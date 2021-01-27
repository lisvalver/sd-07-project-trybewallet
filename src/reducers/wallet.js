import {
  EDIT_EXPENSE,
  EXPENSES_TO_SAVE,
  EXPENSE_TO_DELETE,
  FETCHING,
  SAVE_EDITED_EXPENSE,
  SUCESSFUL_FETCH,
} from '../actions/index';

const INITIAL_STATE = {
  currenciesOptions: [],
  allInfosCurrencies: {},
  expenses: [],
  expenseToEdit: {},
  isEditing: false,
  isFetching: true,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EXPENSES_TO_SAVE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenseToSave],
    };
  case FETCHING:
    return {
      ...state,
      isFetching: true,
    };
  case SUCESSFUL_FETCH:
    return {
      ...state,
      allInfosCurrencies: action.currencies,
      currenciesOptions: Object.keys(action.currencies).filter(
        (currency) => currency !== 'USDT',
      ),
      isFetching: false,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      isEditing: true,
      expenseToEdit: action.editObjExpense,
    };
  case SAVE_EDITED_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses.map((e) => {
          if (e.id === action.objEditedToSave.id) {
            return action.objEditedToSave;
          }
          return e;
        }),
        // state.expenses[action.objEditedToSave.index] =
        //   action.objEditedToSave,
      ],
    };
  case EXPENSE_TO_DELETE:
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense !== state.expenses[action.indexExpenseToDelete],
      ),
    };
  default:
    return state;
  }
}

export default wallet;
