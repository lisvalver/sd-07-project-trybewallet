// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_SUCCESS, FETCH_FAIL } from '../actions';
import Wallet from '../pages/Wallet';

const initialState = {
  currencies: [],
  expenses: [],
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_SUCCESS:
    return { ...state, currencies: action.data };
  case FETCH_FAIL:
    return { ...state };
  default: return state;
  }
};

export default wallet;
