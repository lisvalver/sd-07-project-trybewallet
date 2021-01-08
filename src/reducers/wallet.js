import { REQUEST_CURRENCY, REQUEST_CURRENCY_SUCCESS, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  currencies: [],
  expenses: [],
};

const currency = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY_SUCCESS:
    delete action.USDT;
    return {
      ...state,
      currency: { ...action.currency },
      isFetching: false,
    };
  case REQUEST_CURRENCY:
    return {
      ...state,
      isFetching: true,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          ...action.payload,
          id: state.expenses.length,
          exchangeRates,
        }],
    };
  default:
    return state;
  }
};

export default currency;
