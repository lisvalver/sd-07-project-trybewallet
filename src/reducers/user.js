// Esse reducer será responsável por tratar as informações da pessoa usuária
import CLICK_UPDATE_EMAIL_VALUE from '../actions/actionTypes';

const initialState = {
  email: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case CLICK_UPDATE_EMAIL_VALUE:
    return { ...state, email: action.payload };

  default:
    return state;
  }
};

export default user;
