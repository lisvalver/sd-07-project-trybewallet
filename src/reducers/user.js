import { LOGIN } from '../actions/index';

const userInitalState = {
  email: '',
};

function userReducer(state = userInitalState, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}

export default userReducer;
