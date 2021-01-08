// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCY, RECEIVE_CURRENCY_SUCCESS } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  currency: [''],
};

const currency = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_CURRENCY_SUCCESS:
      delete action.USDT;
      return {
        ...state,
        currency: { ...action.currency },
        isFetching: false,
      }
    case REQUEST_CURRENCY:
      return {
        ...state,
        isFetching: true,
      }
    default:
      return state;
  }
};

export default currency;