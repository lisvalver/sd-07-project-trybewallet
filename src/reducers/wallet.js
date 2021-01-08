import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES_SUCCESS,
  RECEIVE_CURRENCIES_FAILURE,
  EXPENSES, EXPENSES_CURRENCY, EXPENSES_DELETE, EXPENSES_EDITING,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expense: {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  },
  isFetching: false,
  isEditing: false,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  case RECEIVE_CURRENCIES_FAILURE:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses].sort((expen, expen2) =>{
        if (expen.id > expen2.id) return 1;
        if (expen.id < expen2.id) return -1;
        return 0;
      }),
    };
  case EXPENSES_CURRENCY:
    return {
      ...state,
      expense: { ...state.expense, ...action.expense },
    };
  case EXPENSES_DELETE:
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp.id !== action.id),
    };
  case EXPENSES_EDITING:
    return {
      ...state,
      isEditing: action.isEditing,
    };
  default:
    return state;
  }
}

export default wallet;
