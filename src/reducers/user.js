// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN } from '../actions';

const INITIAL_VALUE = {
  login: false,
  email: '',
};

const userReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, login: true, email: action.email };
  default:
    return state;
  }
};

export default userReducer;
