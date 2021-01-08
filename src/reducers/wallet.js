// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WAITING_FETCH, GET_FETCHED, UPDATE_EXPENSES, DELETE_ROW } from '../actions';

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
  case DELETE_ROW:
    return {
      ...state,
      // total:
      //   state.total - (parseFloat(state.expenses[action.id].value) * state.exchangeRates[state.expenses[action.id].currency].ask),
      expenses: [...state.expenses.filter(({ id }) => id !== action.id)],
      // referência: Carol Andrade
    };
  default:
    return state;
  }
}

export default wallet;
