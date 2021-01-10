const INITIAL_STATE = {
  count: 0,
  isFetching: false,
  currencies: [],
  expenses: [],
  error: '',
};

const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_FAIL = 'FETCH_FAIL';
const ADD_EXPENSE = 'ADD_EXPENSE';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
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
  case ADD_EXPENSE:
    return {
      ...state,
      count: state.count + 1,
      expenses: [...state.expenses, {
        id: state.count,
        ...action.value,
        exchangeRates: state.currencies,
      }],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== action.value),
    };
  case FETCH_EXCHANGE_RATES_SUCCESS:
    return {
      ...state,
      isFetching: false,
      currencies: action.value,
    };
  default:
    return state;
  }
};

export default wallet;
