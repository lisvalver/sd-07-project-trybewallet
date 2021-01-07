// Esse reducer será responsável por tratar as informações da pessoa usuária
const SIGN_IN = 'SIGN_IN';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SIGN_IN:
    return { ...state, user: { email: action.payload } };
  default:
    return state;
  }
};

export default user;
