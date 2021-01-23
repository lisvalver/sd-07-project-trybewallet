// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = { currencies: [], expenses: [] };

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CURRENCIES':
    return { ...state, currencies: action.currency };
  case 'EXPENSES':
    return { ...state, expenses: [...state.expenses, action.expense] };
  case 'DELETE':
    return {
      ...state,
      expenses: [...state.expenses].filter((expense) => expense.id !== action.id) };
  default:
    return state;
  }
};

export default wallet;
