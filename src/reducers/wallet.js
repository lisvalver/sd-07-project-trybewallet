const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalValue: 0,
  edit: false,
  expenseEdit: [],
};
const ADD_EXPENSE = 'ADD_EXPENSE';
const DEL_EXPENSE = 'DEL_EXPENSE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';
const TOTAL_EXPENSE = 'TOTAL_EXPENSE';
const STATEEDIT_EXPENSE = 'STATEEDIT_EXPENSE';
const ADD_ALTERED_EXPENSE = 'ADD_ALTERED_EXPENSE';

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.value] };
  case TOTAL_EXPENSE:
    return { ...state,
      totalValue: state.expenses.reduce((acc, { exchangeRates, currency, value }) => {
        const total = parseFloat(value * exchangeRates[currency].ask);
        return acc + total;
      }, 0) };
  case DEL_EXPENSE:
    return { ...state,
      expenses: [...state.expenses.filter((expense) => (expense.id !== action.value))] };
  case STATEEDIT_EXPENSE:
    return { ...state,
      edit: action.value };
  case EDIT_EXPENSE:
    return { ...state,
      expenseEdit: { ...state.expenses.filter((exp) => (exp.id === action.value)) } };
  case ADD_ALTERED_EXPENSE:
    return { ...state, expenses: [...action.value] };
  default:
    return state;
  }
};

export default wallet;
