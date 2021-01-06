import userTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.user;

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case userTypes.SIGNIN:
    return { ...action.payload };
  default:
    return state;
  }
};

export default user;
