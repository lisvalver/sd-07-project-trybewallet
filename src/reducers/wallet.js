const INITIAL_STATE = {
  expenses: [],
  isFetching: false,
  erro: '',
  valorgeral: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST':
    return { ...state, isFetching: true };
  case 'ADD_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.value],
      isFetching: false,
      valorgeral: (state.valorgeral + action.valor),
    };
  case 'FAILED_REQUEST':
    return { ...state, erro: action.value, isFetching: false };
  default:
    return state;
  }
}

export default wallet;
