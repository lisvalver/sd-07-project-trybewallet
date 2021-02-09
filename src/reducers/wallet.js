// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = { currencies: [], expenses: [], editExpense: [], edit: false };

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CURRENCIES':
    return { ...state, currencies: action.currency };
  case 'EXPENSES': {
    const local = state.expenses.find((element) => element.id === action.expense.id);
    if (local) {
      const despesa = [...state.expenses];
      despesa[despesa.indexOf(local)] = action.expense;
      return { ...state, edit: false, expenses: despesa };
    }
    return { ...state, edit: false, expenses: [...state.expenses, action.expense] }; }
  case 'DELETE':
    return {
      ...state,
      expenses: [...state.expenses].filter((expense) => expense.id !== action.id) };
  case 'EDITE': {
    const local = state.expenses.filter((expense) => expense.id === action.id);
    local[0].edit = true;
    return {
      ...state,
      edit: true,
      editExpense: local };
  }
  default:
    return state;
  }
};

export default wallet;
