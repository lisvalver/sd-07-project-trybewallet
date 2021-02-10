// Esse reducer será responsável por tratar as informações da pessoa usuária
// Forma padrão que o Alvaro utilizou
import { LOGIN } from '../actions';

const initialState = {
  email: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email };
  default: return state;
  }
};

export default user;
