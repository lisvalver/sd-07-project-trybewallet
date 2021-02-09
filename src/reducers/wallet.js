import {
  GET_CURRENCIES,
  ADD_EXPENSES,
  DEL_EXPENSES,
  EDIT_EXPENSES,
  ADD_EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editMode: false,
  expenseIdToEdit: '',
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.getCurrencies,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.addExpenses],
    };
  case DEL_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.id), // Source: https://github.com/tryber/sd-07-project-trybewallet/pull/129/files
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      editMode: !state.editMode,
      expenseIdToEdit: action.idExpense,
    };
  case ADD_EDIT_EXPENSE:
    return {
      ...state,
      editMode: !state.editMode,
      expenses: state.expenses.map((item) => {
        if (item.id === action.id) {
          console.log(action.expense);
          const novoobjeto = {
            ...action.expense,
            exchangeRates: item.exchangeRates,
          };
          return novoobjeto; // Obrigado Gabriel Rufino <3
        }
        return item;
      }),
    };
  default:
    return state;
  }
}
