const INITIAL_STATE = {
  email: '',
};

const CHANGE_USER = 'CHANGE_USER';

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_USER:
      return { ...state, email: action.value };
    default:
      return state;
  }
}

export default user;
