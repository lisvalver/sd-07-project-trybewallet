// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
};
function wallet(state = initialState, action) {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.expense] };
  case 'REMOVE_EXPENSE':
    return { ...state,
      expenses: [...action.expense] };
  case 'CURRENCIES':
    return { ...state, currencies: [...state.currencies, action.currencies] };
  default:
    return state;
  }
}

export default wallet;
