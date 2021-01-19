const INITIAL_STATE = {
  email: '',
};

const ADD_EMAIL = 'ADD_EMAIL';

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL:
    return { ...state, email: action.value };
  default:
    return state;
  }
}

export default user;
