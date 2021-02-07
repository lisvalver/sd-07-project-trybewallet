// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  SAVE_CURRENCIES,
  FETCHING_DATA,
  FETCH_FAIL,
} from '../actions';

const initialState = {
  wallet: {
    currencies: [],
    expenses: [],
  },
  fetching: false,
  error: '',
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      fetching: false,
      currencies: { ...action.currencies },
    };

  case FETCHING_DATA:
    return { ...state, fetching: true };

  case FETCH_FAIL:

    return { ...state, fetching: false, error: action.error };

  default: return state;
  }
};

export default wallet;
