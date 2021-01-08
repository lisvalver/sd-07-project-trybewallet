// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SAVE_EMAIL':
      console.log( 'oi')
      return { ...state, email: action.email };
    default:
      return state;
  }
}

export default user;
