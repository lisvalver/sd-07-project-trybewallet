import {
  REQUEST_CURRENCIES,
  ADD_EXPENSE,
  REQUEST_STARTED,
  REQUEST_FAIL } from '../actions/wallet';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, currencies: action.payload, isLoading: false };
  case ADD_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, action.expense],
    };
  case REQUEST_STARTED:
    return { isLoading: true };
  case REQUEST_FAIL:
    return { ...state, isLoading: false };
  default:
    return state;
  }
};

export default wallet;
