import { USER_LOGIN } from '../actions';

const initialState = { user: { email: '' } };

function user(state = initialState, action) {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state, user: { ...state.email, email: action.payload } };
  default:
    return state;
  }
}

export default user;
