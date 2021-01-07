import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  if (action.type === LOGIN) {
    return {
      ...state,
      email: action.email,
    };
  }
  return state;
}

export default user;
