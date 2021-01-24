// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCY } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return ({
      dispatchCurrencyFetch: action.requestCurrency,
    });
  default:
    return state;
  }
};

export default walletReducer;
