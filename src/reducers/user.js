const USER_INITIAL_STATE = {
  email: '',
};

function user(state = USER_INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_USER':
    return { email: action.user };
  default:
    return state;
  }
}

export default user;
