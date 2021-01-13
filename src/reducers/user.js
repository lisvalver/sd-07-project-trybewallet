// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN, RECEIVE_FAILURE, RECEIVE_SUCCESS, REQUEST, ADD } from '../actions/type'

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function user(state = INITIAL_STATE.user, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.value };
  default:
    return state;
  }
}

export default user;
