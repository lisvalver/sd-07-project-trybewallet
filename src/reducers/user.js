import { USER_INFORMATION } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_INFORMATION: {
    return { ...state, email: action.email };
  }
  default:
    return state;
  }
}
