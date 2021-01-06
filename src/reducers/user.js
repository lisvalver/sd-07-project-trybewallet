// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN': {
    console.log(state);
    return {
      ...state,
      user: {
        ...state.user,
        email: action.payload,
      },
    };
  }
  default:
    return state;
  }
}
