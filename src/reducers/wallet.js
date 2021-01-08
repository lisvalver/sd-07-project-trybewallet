import {
  ADD_EXPENSE,
  TOTAL_EXPENSE,
  LIST_CURRENCIES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: 0.00,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case TOTAL_EXPENSE:
    return {
      ...state,
      totalExpenses: state.totalExpenses + Number.parseFloat(action.payload),
    };
  case LIST_CURRENCIES:
    return { ...state, currencies: action.payload };
  default:
    return state;
  }
};

export default walletReducer;
