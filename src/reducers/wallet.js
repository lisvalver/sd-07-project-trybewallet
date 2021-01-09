const INITIAL_STATE = {
  count: 0,
  isFetching: false,
  currencies: [],
  expenses: [],
  error: '',
};

const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_FAIL = 'FETCH_FAIL';
const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
const FETCH_EXCHANGE_RATES_SUCCESS = 'FETCH_EXCHANGE_RATES_SUCCESS';

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case FETCH_FAIL:
    return {
      ...state,
      isFetching: false,
      error: action.value,
    };
  case FETCH_CURRENCIES_SUCCESS:
    return {
      ...state,
      isFetching: false,
      currencies: action.value,
    };
  case FETCH_EXCHANGE_RATES_SUCCESS:
    return {
      ...state,
      isFetching: false,
      count: state.count + 1,
      expenses: [...state.expenses, { ...action.value, id: state.count }],
    };
  default:
    return state;
  }
};

export default wallet;
