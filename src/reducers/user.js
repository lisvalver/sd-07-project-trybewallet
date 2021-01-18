const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  const { email, type } = action;
  switch (type) {
  case 'LOGIN':
    return { ...state, email };
  default:
    return state;
  }
}

export default user;
