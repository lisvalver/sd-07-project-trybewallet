import walletTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.wallet;

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case walletTypes.REQUEST_COINS:
    return { ...state, isFetching: true };
  case walletTypes.GET_COINS:
    return {
      ...state,
      currencies: action.currencies,
      rates: action.rates,
      isFetching: false,
    };
  case walletTypes.FAILED_REQUEST:
    return { ...state, error: action.error, isFetching: false };
  case walletTypes.SUBMIT_EXPENSES:
    // console.log(action);
    action.values.id = state.controlId;
    action.values.exchangeRates = state.rates;
    return {
      ...state,
      expenses: [...state.expenses, action.values],
      controlId: state.controlId + 1,
    };
  default:
    return state;
  }
};

export default wallet;
