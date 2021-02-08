import types from '../actions/types';

const LOGIN_INITIAL_STATE = {
  email: '',
};

const user = (state = LOGIN_INITIAL_STATE, action) => {
  switch (action.type) {
  case types.SAVE_LOGIN:
    return ({
      ...state,
      email: action.email,
    });
  default:
    return state;
  }
};

export default user;
