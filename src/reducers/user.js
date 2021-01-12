// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, user } = action;
  switch (type) {
  case 'login':
    return { email: user };
  default:
    return state;
  }
};

export default userReducer;
