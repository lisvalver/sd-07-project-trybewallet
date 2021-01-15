const initialState = {
  email: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case 'SET_EMAIL':
    return { ...state, email: action.payload.email };
  case 'SET_PASSWORD':
    return { ...state, password: action.payload.password };
  case 'SET_USER':
    return { ...state, user: action.payload.user };
  default:
    return state;
  }
}
export default user;
