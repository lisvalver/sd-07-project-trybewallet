// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import types from '../services/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  btnChange: false,
  elementChange: {},
};

export default function wallet(state = INITIAL_STATE, action) {
  const index = (action.type === types.EDIT_EXPENSE)
    ? state.expenses.findIndex((item) => (item.id === action.Expenses.id))
    : 0;
  const newExpenses = [...state.expenses];
  newExpenses[index] = action.Expenses;
  switch (action.type) {
  case types.RESPONSE:
    return {
      ...state,
      currencies: Object.keys(action.prices),
    };
  case types.DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((item) => (item.id !== action.id)),
    };
  case types.EDIT_EXPENSE:
    return {
      ...state,
      expenses: newExpenses,
      btnChange: false,
    };
  case types.EDIT_BTN:
    return {
      ...state,
      btnChange: action.toogle,
      elementChange: action.Expenses,
    };
  case types.EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses,
        {
          ...action.Expenses,
          exchangeRates: action.objApi,
        },
      ],
    };
  default:
    return state;
  }
}
