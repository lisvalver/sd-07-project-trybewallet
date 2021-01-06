const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = WALLET_INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_WALLET':
    return { state: action.value };
  default:
    return state;
  }
}

export default wallet;
