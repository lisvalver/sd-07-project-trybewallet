import {
  REQUEST_CURRENCIES,
  ADD_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, currencies: action.payload };
  case ADD_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, action.expense],
    };
  default:
    return state;
  }
}

export default wallet;
