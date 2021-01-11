const INITIAL_STATE = { wallet: { currencies: [], expenses: [] } };

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'EMAIL':
    return { wallet: { currencies: [], expenses: [] } };
  default:
    return state;
  }
};

export default walletReducer;
