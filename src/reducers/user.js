import { SET_EMAIL } from '../actions';

const initialState = {
  email: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case SET_EMAIL:
    return { ...state, email: action.email };
  default: return state;
  }
};

export default user;
