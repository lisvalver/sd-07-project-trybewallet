// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = [
  {
    user: {
      email: '',
      senha: '',
    },
  },
];

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SIGNIN':
    return [...state, action.payload];
  default:
    return state;
  }
}

export default user;
