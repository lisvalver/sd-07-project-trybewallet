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
    // action.values.id = state.controlId;
    action.values.exchangeRates = state.rates;
    return {
      ...state,
      expenses: [...state.expenses,
        { ...action.values,
          id: state.expenses.length > 0 ? state.expenses[state.expenses.length - 1]
            .id + 1 : 0 },
      ],
      controlId: state.controlId + 1,
    };
  case walletTypes.DELETE_EXPENSE:
    console.log(action);
    return {
      ...state,
      expenses: [...state.expenses.filter((item) => item.id !== action.expense.id)],
    };
  default:
    return state;
  }
};

export default wallet;
