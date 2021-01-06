const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const WALLET = 'WALLET';

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET:
    return {
      ...state,
      currencies: action.value.currencies,
      expenses: action.value.expenses,
    };
  default:
    return state;
  }
};

export default wallet;
