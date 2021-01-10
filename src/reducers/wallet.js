// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCHING, FETCH_SUCCESS } from '../actions';
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        currencies: { ...state.currencies },
        expenses: [...state.expenses],
        isFetching: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        currencies: { ...action.data },
        expenses: [...state.expenses],
        isFetching: false,
      }
  default:
      return state;
  }
};

export default walletReducer;
