const InitialState = {
  email: '',
};

function user(state = InitialState, action) {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, email: action.email };
  default:
    return state;
  }
}

export default user;
