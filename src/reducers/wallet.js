// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCY } from '../actions';

const INITIAL_STATE = {
  password: '',
  value: '',
  currency: 'USD',
  description: '',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};

const walletReducer = (state = INITIAL_STATE, action) => {
  console.log('chegou', action);
  switch (action.type) {
  case REQUEST_CURRENCY:
    return ({
      currency: action.requestCurrency,
    });
  default:
    return state;
  }
};

export default walletReducer;
