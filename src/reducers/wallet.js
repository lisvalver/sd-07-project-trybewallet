// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = [];

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return [...state, action.payload];
    default:
      return state;
  }
}

export default wallet;
