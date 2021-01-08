// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES_SUCCESS,
  RECEIVE_CURRENCIES_FAILURE,
} from '../actions/index';

const INITIAL_STATE = {
  isFetching: false,
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  const { type, expense } = action;
  switch (type) {
  case 'ADD_EXPENSE':
    return { expenses: [...state.expenses, expense] };
  case REQUEST_CURRENCIES:
    return { ...state, isFetching: true };
  case RECEIVE_CURRENCIES_SUCCESS:
    return {
      ...state,
      isFetching: false,
      currencies: { ...action.currencies },
    };
  case RECEIVE_CURRENCIES_FAILURE:
    return {
      ...state,
      isFetching: false,
      error: action.error.message,
    };
  default:
    return state;
  }
}

export default walletReducer;
