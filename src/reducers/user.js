import { EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default user;
