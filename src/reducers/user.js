// import { act } from "@testing-library/react";

// Esse reducer será responsável por tratar as informações da pessoa usuária
import INITIAL_STATE from './initialState';

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, user: { ...state.user, email: action.payload } };
  default:
    return state;
  }
};

export default user;
