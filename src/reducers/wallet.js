// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES,
  GET_CURRENCIES,
  POST_EXPENSES,
  DELETE,
  UPDATE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state,
      wallet: { ...state.wallet, currencies: action.payload },
    };
  case GET_CURRENCIES:
    return { ...state, currencies: action.payload };
  case POST_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DELETE:
    return {
      ...state,
      expenses:
      state.expenses.filter((expense) => expense.id !== parseInt(action.id, 10)) };
  case UPDATE_EXPENSE:
    return {
      ...state,
      expenses: [...state
        .expenses.filter((expense) => expense.id !== parseInt(action.payload.id, 10)),
      action.payload].sort((a, b) => a.id - b.id),
    };
  default:
    return state;
  }
};

export default walletReducer;
