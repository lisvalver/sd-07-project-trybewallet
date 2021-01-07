// Esse reducer será responsável por tratar as informações da pessoa usuária

import { LOGIN } from '../actions';

const USER_INITIAL_STATE = {
  email: '',
};

function userReducer(state = USER_INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.payload };
  default:
    return state;
  }
}

export default userReducer;
