// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCY, GET_CURRENCY, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return state;
  case GET_CURRENCY:
    return {
      ...state,
      currencies: Object.values(action.payload),
    };
  case FAILED_REQUEST:
    return state;
  default:
    return state;
  }
};

export default wallet;
