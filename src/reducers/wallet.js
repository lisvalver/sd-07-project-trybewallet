// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  password: '',
};

const passwordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_PASSWORD':
    return { ...state, password: action.password };
  default:
    return state;
  }
};

export default passwordReducer;
