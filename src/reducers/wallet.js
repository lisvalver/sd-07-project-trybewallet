// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import initialState from './initialState';

const INITIAL_STATE = initialState.wallet;

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CHANGE':
    return { ...state, expenses: [...action.expenses] };
  case 'FETCH_SUCCESS':
    return { ...state, currencies: [...Object.keys(action.payload).map((key) => action.payload[key])] };
  default:
    return state;
  }
};

export default walletReducer;
