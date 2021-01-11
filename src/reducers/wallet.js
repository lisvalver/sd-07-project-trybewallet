import { ADD_CURRENCIES, ADD_EXPENSE, DELETE_EXPENSE, EDITEXPENSE } from '../actions/wallet';

const initialState = {
  currencies: [],
  expenses: [],
  totalExpense: 0,
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
      expenses: state.expenses.filter(expense => expense.id !== action.expense.id)
    };
  case EDITEXPENSE:
    console.log(action.expense); // está trazendo o objeto que desejo editar
    return {
      ...state,
      // ...state, expenses: action.expense,
    };
  default:
    return state;
  }
}
