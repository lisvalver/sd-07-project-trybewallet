// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  const { email, type } = action;
  switch (type) {
  case 'LOGIN':
    return { ...state, email };
  default:
    return state;
  }
}

export default loginReducer;
