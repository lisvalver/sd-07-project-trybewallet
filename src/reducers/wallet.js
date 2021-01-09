import { REQUEST_MOEDA, REQUEST_MOEDA_SUCESS, REQUEST_FAIL } from '../actions/index';

const INICIAL_STATE = {
  currencies: ['BRL'],
  expenses: [0],
  isFetching: false,
};

const userWallet = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_MOEDA:
    return { ...state, isFetching: true };
  case REQUEST_MOEDA_SUCESS:
    return { ...state, isFetching: false, currencies: { ...action.payload } };
  case REQUEST_FAIL:
    return { ...state, isFetching: false, currencies: { ...action.error } };
  default:
    return state;
  }
};

export default userWallet;
