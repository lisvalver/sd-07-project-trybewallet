// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = {
  email: '',
};

export const LOGIN = 'LOGIN';

export function userReducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return { email: action.email };
  default:
    return state;
  }
}
