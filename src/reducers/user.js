import types from '../actions/types';

const INITIAL_STATE = {
  email: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.USER_INFORMATION: {
    return { ...state, email: action.email };
  }
  default:
    return state;
  }
}
