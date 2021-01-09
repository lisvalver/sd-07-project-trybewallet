const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = WALLET_INITIAL_STATE, action) {
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
