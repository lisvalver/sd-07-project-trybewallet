// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_USER } from '../actions/index';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_USER:
    return { ...state, user: { email: action.email } };
  default:
    return state;
  }
}

export default userReducer;
