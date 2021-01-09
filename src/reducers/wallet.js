// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE, UPDATE_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
};
const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses, {
          ...action.payload,
          id: state.expenses.length,
          exchangeRates: state.currencies,
        },
      ],
    };
  case UPDATE_CURRENCIES:
    return { ...state, currencies: action.exchangeRates };
  default:
    return state;
  }
};

export default wallet;
