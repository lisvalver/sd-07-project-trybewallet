import initialState from './initialState';

const INITIAL_STATE = initialState.user;

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default userReducer;
