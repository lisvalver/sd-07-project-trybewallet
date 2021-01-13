import { EMAIL } from '../actions';

const USER = {
  email: '',
};

function user(state = USER, action) {
  switch (action.type) {
  case EMAIL:
    return { ...state, email: action.email };
  default:
    return state;
  }
}

export default user;
