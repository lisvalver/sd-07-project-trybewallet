// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER } from '../actions/index';

const InitialState = {
  email: '',
};

const user = (state = InitialState, action) => {
  switch (action.type) {
  case USER:
    return {
      ...state,
      email: action.data,
    };
  default: return state;
  }
};

export default user;
