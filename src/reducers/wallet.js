// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
  controlId: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'DESPESAS':
    action.expenses.id = state.controlId;
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
      controlId: state.controlId + 1,
    };
  default:
    return state;
  }
}

export default wallet;
