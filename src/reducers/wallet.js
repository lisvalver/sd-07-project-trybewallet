// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
  isEditing: false,
  editingId: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  const { type, expense, id, bool } = action;
  switch (type) {
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, expense] };
  case 'DELETE_EXPENSE':
    return { ...state, expenses: [...state.expenses.filter((exp) => exp.id !== id)] };
  case 'EDITING_EXPENSE':
    return { ...state, isEditing: bool, editingId: action.editingId };
  case 'EDITED_EXPENSE':
    return {
      ...state,
      isEditing: bool,
      expenses: [...state.expenses.map((elem) => {
        if (elem.id === action.editingId) {
          return {
            ...elem,
            expense,
          };
        }
        return elem;
      })],
    };
  case REQUEST:
    return { ...state };
  case SUCCESS:
    return {
      ...state,
      currencies: { ...action.currencies },
    };
  case FAILURE:
    return {
      ...state,
      error: action.error.message,
    };
  default:
    return state;
  }
}

export default walletReducer;
