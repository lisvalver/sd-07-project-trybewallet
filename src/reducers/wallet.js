import actions from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
  currentId: 0,
  rates: {},
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.ADD_EXPENSE:
    action.expense.id = state.currentId;
    action.expense.exchangeRates = state.rates;
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      currentId: state.currentId + 1 };
  case actions.REQUEST:
    return { ...state, isLoading: true };
  case actions.RECEIVE_SUCCESS:
    return { ...state, currencies: action.currencies, isLoading: false };
  case actions.RECEIVE_ERROR:
    return { ...state, currencies: action.currencies, isLoading: false };
  case actions.EXCHANGE_CURRENCY:
    return { ...state, rates: action.exchangeRates };
  default:
    return state;
  }
}

export default walletReducer;
