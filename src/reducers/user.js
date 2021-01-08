import { USER_LOGIN } from '../actions';

function user(state = { email: '' }, action) {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state, email: action.payload };
  default:
    return state;
  }
}

export default user;
