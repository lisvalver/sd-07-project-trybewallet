// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_EMAIL } from '../actions';

const LOGIN_INITIAL_STATE = {
  email: '',
};

const userReducer = (state = LOGIN_INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return ({
      email: action.email,
    });
  default:
    return state;
  }
};

export default userReducer;
