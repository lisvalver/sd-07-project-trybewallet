import {
  ADD_CURRENCIES, ADD_EXPENSE,
  DELETE_EXPENSE, EDITEXPENSE } from '../actions/wallet';

const initialState = {
  currencies: [],
  expenses: [],
  totalExpense: 0,
  updateExpense: [],
};
export default function (state = initialState, action) {
  const { totalExpense } = { ...state };
  switch (action.type) {
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.expense }],
      totalExpense:
      totalExpense + (Number(action.expense.value)
      * action.expense.exchangeRates[action.expense.currency].ask),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => (expense.id !== action.expense.id)),
    };
  case EDITEXPENSE:
    // console.log(state.expenses) // array de expenses
    // console.log(action.expense) // expense que desejo editar
    return {
      ...state, updateExpense: action.expense,
      // [...state.expenses].map((expense) => {
      //   if (expense.id === action.expense.id) {
      //     return {
      //       ...expense, ...action.expense
      //     }
      //   }
      //   return expense;
      // }),
    };
  default:
    return state;
  }
}
