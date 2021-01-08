import userTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.user;

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case userTypes.LOGIN:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default user;
