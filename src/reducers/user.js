import { typesActions } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case typesActions.UPDATE_EMAIL:
    return { email: action.sendEmail };
  default:
    return state;
  }
};

export default user;
