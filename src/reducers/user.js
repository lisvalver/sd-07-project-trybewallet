// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};
const LOGIN = 'LOGIN';

function user(state = INITIAL_STATE.user, action) {
  // console.log(action);
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.value };
  default:
    return state;
  }
}

export default user;
