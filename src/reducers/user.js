// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_USER } from '../constants';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
  case LOGIN_USER:
    return { email: payload };
  default:
    return state;
  }
};

export default user;
