// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  isFetching: false,
  currencies: [],
  expenses: [],
  error: '',
  nextId: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_CURRENCIES':
    return { ...state, isFetching: true };
  case 'GET_CURRENCIES':
    return { ...state, currencies: action.payload, isFetching: false };
  case 'UPDATE_EXPENSES':
    return {
      ...state,
      isFetching: false,
      expenses: [...state.expenses, action.payload],
    };
  case 'INCREMENT_ID':
    return { ...state, nextId: state.nextId + 1 };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses].filter(
        (expense) => expense.id !== parseInt(action.payload, 10),
      ),
    };
  case 'FAILED_REQUEST':
    return { ...state, error: action.payload, isFetching: false };
  default:
    return state;
  }
}
