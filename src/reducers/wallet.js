// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
  nextId: 0,
  rates: {},
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'CURRENCY_UPDATE_VALUE':
    return { ...state, currencies: action.currencies, rates: action.rates };
  case 'EXPENSES_UPDATE_VALUE':
    action.expense.id = state.nextId;
    action.expense.exchangeRates = state.rates;
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      nextId: state.nextId + 1,
    };
  default:
    return state;
  }
};

export default wallet;
