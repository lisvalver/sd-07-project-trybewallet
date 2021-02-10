// Esse reducer será responsável por tratar as informações da pessoa usuária
// Forma padrão que o Pedro mostrou
const INITIAL_STATE = { email: '' };

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'EMAIL':
    return { email: action.value };
  default:
    return state;
  }
};

export default userReducer;
