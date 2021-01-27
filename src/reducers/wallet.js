// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
  nextId: 0,
  rates: {},
  toggleForm: false,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'CURRENCY_UPDATE_VALUE':
    return { ...state, currencies: action.currencies, rates: action.rates };
  case 'EXPENSES_ADD_VALUE':
    action.expense.id = state.nextId;
    action.expense.exchangeRates = state.rates;
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      nextId: state.nextId + 1,
    };
  case 'EXPENSES_DELETE_VALUE':
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case 'TOGGLE_FORMS':
    return {
      ...state,
      toggleForm: action.edit,
      editingExpense: action.currentId,
    };
  case 'EXPENSES_UPDATE_VALUE': {
    const index = action.idExpense;
    const currentExpenses = [...state.expenses];
    currentExpenses[index] = { ...action.editExpense,
      exchangeRates: state.expenses[index].exchangeRates,
      id: state.expenses[index].id };
    return {
      ...state,
      expenses: [...currentExpenses],
    };
  }

  default:
    return state;
  }
};

export default wallet;
