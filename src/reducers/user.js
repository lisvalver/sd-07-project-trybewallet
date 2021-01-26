const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EMAIL':
    return {
      email: action.value,
    };
  default:
    return state;
  }
}

export default user;
