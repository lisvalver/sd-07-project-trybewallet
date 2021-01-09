// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { typesActions } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [
    // {
    //   id: '',
    //   value: '',
    //   description: '',
    //   currency: '',
    //   method: '',
    //   tag: '',
    //   exchangeRates: {},
    // },
  ],
  isFetching: false,
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typesActions.SAVE_COINS:
      return { ...state, currencies: action.payload };
    case typesActions.REQUEST_COINS:
      return { ...state, isFetching: true };
    case typesActions.REQUEST_COINS_SUCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        expenses: [ ...state.expenses, { exchangeRates: action.payload } ],
      };
    case typesActions.REQUEST_COINS_FAIL:
      return { ...state, isFetching: false, error: action.payload };
    default:
      return state;
  }
};

export default wallet;
