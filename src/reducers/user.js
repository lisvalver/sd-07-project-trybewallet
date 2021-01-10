// Esse reducer será responsável por tratar as informações da pessoa usuária
import types from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.types) {
  case types.CHANGE_EMAIL:
    return { ...state, email: action.user.email };
  default:
    return state;
  }
}

export default user;
