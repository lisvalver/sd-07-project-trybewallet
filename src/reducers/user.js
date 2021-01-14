import actions from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.LOGIN_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}

export default userReducer;
