import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  EDIT_MODE,
  SET_CURRENCIES,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
  counter: 0,
  editing: -1,
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
  case EDIT_MODE:
    return {
      ...state,
      editing: action.id,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editing: -1,
      expenses: state.expenses.map((elem) => {
        if (elem.id === action.id) {
          return {
            ...elem,
            ...action.expense,
            exchangeRates: { ...elem.exchangeRates },
          };
        }
        return elem;
      }),
    };
  default:
    return state;
  }
};

export default wallet;
