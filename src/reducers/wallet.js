import {
  REQUEST_WALLET,
  RECEIVE_WALLET_SUCCESS,
  RECEIVE_WALLET_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

function wallet(state=INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_WALLET:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_WALLET_SUCCESS:
      return {
        ...state,
        wallet: action.wallet,
        isFetching: false,
      }
    case RECEIVE_WALLET_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      }
    default:
      return state;
  }
}

export default wallet;
