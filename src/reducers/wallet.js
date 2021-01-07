// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WAITING_FETCH, GET_FETCHED, UPDATE_EXPENSES } from '../actions';

const initialState = {
  currencies: ['empty'],
  isFetching: false,
  exchangeRates: {},
  expenses: [],
  total: 0,
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case WAITING_FETCH:
    return { ...state, isFetching: true };
  case GET_FETCHED:
    delete action.payload.USDT;
    return {
      ...state,
      isFetching: false,
      currencies: Object.keys(action.payload),
      exchangeRates: { ...action.payload },
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...action.payload,
          exchangeRates: state.exchangeRates,
        },
      ],
      total:
        state.total
        + (parseFloat(action.payload.value)
        * state.exchangeRates[action.payload.currency].ask),
    };
  default:
    return state;
  }
}

export default wallet;
