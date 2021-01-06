// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import initialState from './initialState';

const INITIAL_STATE = initialState.wallet;

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CHANGE':
    return { ...state, expenses: [...action.expenses] };
  case 'CURRENCIES':
    return { ...state, currencies: [...action.currencies] };
  default:
    return state;
  }
};

export default walletReducer;
