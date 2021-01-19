import {
  EXPENSES_TO_SAVE,
  EXPENSE_TO_DELETE,
  FETCHING,
  SUCESSFUL_FETCH,
} from '../actions/index';

const INITIAL_STATE = {
  currenciesOptions: [],
  allInfosCurrencies: {},
  expenses: [],
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
  case EXPENSE_TO_DELETE:
    return {
      ...state,
      expenses: state
        .expenses
        .filter((expense) => expense !== state.expenses[action.indexExpenseToDelete]),
    };
  default:
    return state;
  }
}

export default wallet;
