import { EMAIL_LOGIN } from '../actions';

const LOGIN_INITIAL_STATE = { email: '' };

const user = (state = LOGIN_INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL_LOGIN:
    return {
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
