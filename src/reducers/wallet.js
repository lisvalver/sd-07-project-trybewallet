const INITIAL_STATE = {
  expenses: [],
  isFetching: false,
  erro: '',
  valorgeral: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'EDITING':
    state.expenses[(action.obj.id)] = action.obj;
    return (
      {
        ...state,
      }
    );
  case 'DELETED':
    state.expenses.splice(action.id, 1);
    return (
      {
        ...state,
        // expenses: state.expenses.map((obj, index) => ({ ...obj, id: index })),
        expenses: state.expenses.map((obj) => ({ ...obj })),
      }
    );
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
