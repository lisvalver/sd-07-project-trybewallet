const INITIAL_STATE = {
  currencies: [],
  expenses: [{
    id: 0,
    value: '0',
    currency: 'USD',
    exchangeRates: {
      USD: {
        ask: '0'
      }
    },
  }],
};

const NEW_EXPENSE = 'NEW_EXPENSE';

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case NEW_EXPENSE:
    return state;
  default:
    return state;
  };
}

export default wallet;
