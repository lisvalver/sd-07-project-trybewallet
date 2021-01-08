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
  const currentId = state.expenses.length - 1;

  switch (action.type) {
  case NEW_EXPENSE:
    return state/*{
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: currentId,
          value: '0',
          description: '',
          currency: '',
          method: '',
          tag: '',
          exchangeRates: {},
        }
      ],
    };*/
  default:
    return state;
  };
}

export default wallet;
