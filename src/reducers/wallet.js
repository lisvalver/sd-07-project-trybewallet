// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_CUREENCIES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
} from '../actions/wallet.action';

const INITILA_STATE = {
  currencies: [],
  expenses: [],
  totalExpense: 0,
};

export default function (state = INITILA_STATE, action) {
  const { type, currencies } = action;
  const { totalExpense } = { ...state };
  switch (type) {
  case ADD_CUREENCIES:
    return { ...state, currencies };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.expense }],
      totalExpense:
    totalExpense + (Number(action.expense.value)
    * action.expense.exchangeRates[action.expenses.currencies].ask),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expense: state.expenses.filter((expense) => expense.id !== action.expense.id),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
    };
  default:
    return state;
  }
}
