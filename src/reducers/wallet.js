import { ADD_EXPENSE, DELETE_EXPENSE, SET_CURRENCIES } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
  counter: 0,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.counter,
          ...action.expense,
          exchangeRates: Object.fromEntries(state.currencies),
        },
      ],
      counter: state.counter + 1,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp.id !== action.id),
    };
  default:
    return state;
  }
};

export default wallet;
