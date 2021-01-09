// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  const { type, expense, id } = action;
  switch (type) {
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, expense] };
  case 'DELETE_EXPENSE':
    return { ...state, expenses: [...state.expenses.filter((exp) => exp.id !== id)] };
  case REQUEST:
    return { ...state, isFetching: true };
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
