// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE, REQUEST_CURRENCIES, RECEIVE_CURRENCIES } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isloading: false,
  rates: {},
  nextId: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    action.expense.id = state.nextId;
    action.expense.exchangeRates = { ...state.rates };

    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      nextId: state.nextId + 1,
    };
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isloading: true,
    };
  case RECEIVE_CURRENCIES:
  {
    delete action.currencies.USDT;
    const newCurrencies = Object.keys(action.currencies);
    return {
      ...state,
      isloading: false,
      currencies: newCurrencies,
      rates: action.currencies,
    };
  }
  default:
    return state;
  }
}

export default wallet;
