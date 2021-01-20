import {
  ADDTOTAL,
  FETCH_CURRENCIES,
  DELETE,
  EDIT_EXPENSES,
  THIS_EDITING,
  ADD_EDICAO,
  SAVE_EXPENSES,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  id: 0,
  isEditing: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADDTOTAL:
    return (
      {
        ...state,
        total: state.expenses.reduce((result, expense) => (
          result + (parseFloat(expense.exchangeRates[expense.currency]
            .ask * expense.value))
        ), 0).toFixed(2),
      }
    );
  case FETCH_CURRENCIES:
    return (
      {
        ...state,
        currencies: [...state.currencies, ...Object.keys(action.currencies)]
          .filter((c) => c !== 'USDT'),
      }
    );
  case SAVE_EXPENSES:
    return (
      {
        ...state,
        expenses: [...state.expenses, { ...action.expenses, id: state.id }],
        id: state.id + 1,
      }
    );
  case THIS_EDITING:
    return (
      {
        ...state,
        isEditing: action.change,
      }
    );
  case ADD_EDICAO:
    return (
      {
        ...state,
        expenses: state.expenses.map((expense) => {
          if (expense.id === action.expense.id) {
            return action.expense;
          }
          return expense;
        }),
      }
    );
  case EDIT_EXPENSES:
    return (
      {
        ...state,
        expenses: [...state.expenses, ...action.expenses.id],
      }
    );
  case DELETE:
    return (
      {
        ...state,
        expenses: state.expenses.filter((exp) => exp.id !== action.id),
      }
    );
  default:
    return state;
  }
}
