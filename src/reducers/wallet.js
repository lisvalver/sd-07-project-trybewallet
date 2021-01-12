// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { typesActions } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [
    // {
    //   id: '',
    //   value: '',
    //   description: '',
    //   currency: '',
    //   method: '',
    //   tag: '',
    //   exchangeRates: {},
    // },
  ],
  isFetching: false,
  error: '',
  nextId: 0,
  countExpense: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesActions.REQUEST_COINS:
      return { ...state, isFetching: true };
    case typesActions.SAVE_CURRENCIES:
      return {
        ...state,
        isFetching: false,
        error: '',
        currencies: action.payload,
      };
    case typesActions.SAVE_EXPENSES:
      return {
        ...state,
        isFetching: false,
        error: '',
        expenses: [
          ...state.expenses,
          {
            id: state.nextId,
            ...action.form,
            exchangeRates: action.currencies,
          },
        ],
        nextId: state.nextId + 1,
      };
    case typesActions.DELETE_EXPENSE:
      return {
        ...state,
        // nextId: 0,
        expenses: [
          ...state.expenses.filter(expense => expense.id !== action.id),
        ],
      };
    case typesActions.UPDATE_COUNT:
      return { ...state, countExpense: action.value };
    case typesActions.REQUEST_COINS_FAIL:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
};

export default wallet;
