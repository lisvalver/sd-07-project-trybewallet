import userTypes from './types';

const userReducer = (state = {}, action) => {
  switch (action.type) {
  case userTypes.LOGIN:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default userReducer;
