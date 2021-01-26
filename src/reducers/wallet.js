const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_LIST':
    return state;
  default:
    return state;
  }
}

export default wallet;
