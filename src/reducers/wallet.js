const INITIAL_STATE = {
  email: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_USER':
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default wallet;
