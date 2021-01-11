import { EDIT_EXPENSE, HANDLE_EDIT_CHAGE } from '../actions';

const formExpenseInitialState = {
  expense: {
    value: 0,
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    currencies: [],
  },
};

function editReducer(state = formExpenseInitialState, action) {
  switch (action.type) {
  case EDIT_EXPENSE:
    return {
      expense: action.payload,
    };
  case HANDLE_EDIT_CHAGE:
    return {
      ...state,
      expense: { ...state.expense, [action.payload.name]: action.payload.value },
    };
  default:
    return state;
  }
}

export default editReducer;
