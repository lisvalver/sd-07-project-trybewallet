// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = [
  {
    despesas: 0,
  },
];

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'DESPESAS':
    return { despesas: action.despesas };
  default:
    return state;
  }
}

export default wallet;
