// Esse reducer será responsável por tratar as informações da pessoa usuária
import types from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.CHANGE_EMAIL:
    return { email: action.email };
  default:
    return state;
  }
}

export default user;
