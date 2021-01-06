export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  }
}

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CURRENCIES:
      return { ...state, currencies: action.currency};
    case ADD_EXPENSE:
      return { ...state, expenses: action.expense};
    default:
      return state;
  }
}

export default wallet;
