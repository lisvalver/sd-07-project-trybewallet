// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSES, ADD_CURRENCIES, NEW_EXPENSE_ARRAY } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.expenses,
      ],
    };
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: [
        ...state.currencies,
        action.currencies,
      ],
    };
  case NEW_EXPENSE_ARRAY:
    return {
      ...state,
      expenses: action.newArray,
    };
  default:
    return state;
  }
};

export default wallet;
