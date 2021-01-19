// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
};

const ADD_EXPENSE = 'ADD_EXPENSE';
const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.value] };
  case REMOVE_EXPENSE:
    return { ...state, expenses: action.value };
  case UPDATE_EXPENSE:
    return { ...state, expenses: [...action.value] };
  default:
    return state;
  }
}

export default wallet;
