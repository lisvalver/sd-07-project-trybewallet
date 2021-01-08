import {
  REQUEST_CURRENCIES,
  REQUEST_CURRENCIES_DATA,
  ADD_EXPENSE,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  latestExchange: {},
  currentId: 0,
  totalExpense: 0,

};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, currencies: (action.currencies).sort() };
  case REQUEST_CURRENCIES_DATA:
    return { ...state, latestExchange: action.exchangeRates };
  case ADD_EXPENSE:
    action.expense.id = state.currentId;
    action.expense.exchangeRates = { ...state.latestExchange };
    return { ...state,
      expenses: [...state.expenses, action.expense],
      currentId: state.currentId + 1,
      totalExpense: state.totalExpense
      + Number(action.expense.value)
      * Number(state.latestExchange[action.expense.currency].ask),
    };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: [...state.expenses.filter(({ id }) => id !== action.id)],
      totalExpense: state.totalExpense
      - Number(action.value),
    };
  default:
    return state;
  }
}
