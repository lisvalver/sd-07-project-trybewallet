// Esse reducer será responsável por tratar as informações da pessoa usuária

const initialState = {
  email: '',
  senha: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case 'USER':
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default user;
