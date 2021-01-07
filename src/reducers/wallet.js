const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES:
    return {
      ...state,
      currencies: action.value.currencies,
    };
  default:
    return state;
  }
};

export default wallet;
