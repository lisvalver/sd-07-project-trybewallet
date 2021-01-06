import { CREATE_EMAIL } from '../actions';

const LOGIN_INITIAL_STATE = { email: '' };

const user = (state = LOGIN_INITIAL_STATE, action) => {
  switch (action.type) {
  case CREATE_EMAIL:
    return ({
      email: action.email,
    });
  default:
    return state;
  }
};

export default user;
