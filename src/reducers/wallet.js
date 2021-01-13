// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVE_FAILURE, RECEIVE_SUCCESS, REQUEST, ADD } from '../actions/type';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    expenses: [],
    error: '',
    isFetching: '',
    currencies: {},
  },
};

const wallet = (state = INITIAL_STATE.wallet, action) => {
  switch (action.type) {
  case REQUEST:
    return {
      ...state,
      isFetching: true,
      error: '',
    };
  case RECEIVE_SUCCESS:
    return {
      ...state,
      isFetching: false,
      currencies: action.value,
    };
  case RECEIVE_FAILURE:
    return {
      ...state,
      isFetching: false,
      error: 'erro',
    };
  case ADD:
    return { ...state, expenses: [...state.expenses, action.expenses] };
  default:
    return state;
  }
};

export default wallet;
