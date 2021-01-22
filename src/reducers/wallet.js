// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_CUREENCIES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  UPDATE_EXPENSE,
} from '../actions/wallet.action';

const INITILA_STATE = {
  currencies: [],
  expenses: [],
  totalExpense: 0,
  isEdit: false,
  updateEx: {},
};

export default function (state = INITILA_STATE, action) {
  const { type, currencies, editEx, upEx } = action;
  const { totalExpense } = { ...state };
  console.log(action);
  switch (type) {
  case ADD_CUREENCIES:
    return { ...state, currencies };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.expenses }],
      totalExpense:
    totalExpense + (Number(action.expenses.value)
    * action.expenses.exchangeRates[action.expenses.currency].ask),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...action.expense],
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      updateEx: editEx,
      isEdit: true,
    };
  case UPDATE_EXPENSE:
    console.log(action);
    return {
      ...state,
      expenses: [...state.expenses].map((expense) => {
        console.log(editEx);
        if (expense.id === upEx.id) {
          return upEx;
        }
        return expense;
      }),
      isEdit: false,
    };
  default:
    return state;
  }
}
