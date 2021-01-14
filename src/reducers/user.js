import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  logged: false,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email, logged: true };
  default:
    return state;
  }
};

export default user;
