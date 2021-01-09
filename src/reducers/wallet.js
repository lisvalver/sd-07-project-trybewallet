// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { REQUEST_API_SUCCESS, REQUEST_CURRENCY } from '../actions/index';

const INITIAL_VALUE = {
  isFetching: false,
};

function wallet(state = INITIAL_VALUE, action) {
  switch (action.type) {
  case REQUEST_API_SUCCESS:
    return {
      ...state,
      currencies: [action.value],
      isFetching: false,
    };
  case REQUEST_CURRENCY:
    return ({
      ...state,
      isFetching: true,
    });
  default:
    return state;
  }
}

export default wallet;
