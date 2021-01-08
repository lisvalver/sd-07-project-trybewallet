const INITIAL_STATE = {
  expenses: [],
  isFetching: false,
  erro: '',
  valorgeral: 0,
};

function wallet(state = INITIAL_STATE, action) {
  const newexpen = [...state.expenses];
  switch (action.type) {
  case 'EDITING':
    newexpen[(action.obj.id)] = action.obj;
    return (
      {
        ...state,
        expenses: newexpen,
      }
    );
  case 'DELETED':
    newexpen.splice(action.id, 1);
    return (
      {
        ...state,
        // expenses: newexpen.map((obj, index) => ({ ...obj, id: index })),
        expenses: newexpen,
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
