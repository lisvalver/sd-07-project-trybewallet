// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {...state, expenses: [...state.expenses, action.expense]};
    case 'REQUEST':
      return {...state, isLoading: true};
    case 'RECEIVE_SUCCESS':
      return {...state, currencies: action.currencies, isLoading: false};
    case 'RECEIVE_ERROR':
    return {...state, currencies: action.currencies, isLoading: false};
  default:
    return state;
  }
}

export default wallet;
