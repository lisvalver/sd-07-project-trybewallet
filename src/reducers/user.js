// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER_EMAIL } from '../actions/index';

const INITIAL_STATE_USER = {
  email: '',
};

const user = (state = INITIAL_STATE_USER, action) => {
  switch (action.type) {
  case USER_EMAIL:
    return {
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
