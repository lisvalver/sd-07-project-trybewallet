// Esse reducer será responsável por tratar as informações da pessoa usuária
// Esse reducer será responsável por tratar as informações da pessoa usuária
import { CHANGE_EMAIL, CHANGE_PASSWORD } from '../actions';

const initialState = {
  email: '',
  password: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
  case CHANGE_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  case CHANGE_PASSWORD:
    return {
      ...state,
      password: action.payload,
    };
  default:
    return state;
  }
}
