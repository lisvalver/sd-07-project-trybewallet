// Esse reducer será responsável por tratar as informações da pessoa usuária
import CLICK_UPDATE_EMAIL_VALUE from '../actions/actionTypes';

const initialState = {
  user: {
    email: '',
  },
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case CLICK_UPDATE_EMAIL_VALUE:
    return { ...state, newValue: action.newValue };
  default:
    return state;
  }
};

export default user;
