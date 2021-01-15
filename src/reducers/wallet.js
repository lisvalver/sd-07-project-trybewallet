// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case 'ADD_WALLET_CURRENCIES':
    return { ...state, currencies: action.wallet };
  case 'ADD_WALLET_EXPENSES':
    return { ...state, expenses: [...state.expenses, action.wallet] };
  case 'UPDATE_EXPENSES':
    return { ...state, expenses: action.expenses };
  default:
    return state;
  }
}

export default wallet;
