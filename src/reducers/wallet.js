// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  SAVE_RATES,
  FETCHING_DATA,
  FETCH_FAIL,
} from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  rates: {},
  fetching: false,
  error: '',
  totalExpenses: 0,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_RATES:
    return {
      ...state,
      fetching: false,
      rates: action.rates,
      currencies: action.currencies,
    };

  case FETCHING_DATA:
    return { ...state, fetching: true };

  case FETCH_FAIL:

    return { ...state, fetching: false, error: action.error };

  default: return state;
  }
};

export default wallet;
