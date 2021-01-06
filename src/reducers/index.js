const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function listReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'CHANGE_NAME':
    return { ...state, characterName: action.value };
  default:
    return state;
  }
}

export default listReducer;
