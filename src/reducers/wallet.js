// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  let allCurrencies;
  switch (action.type) {
  case FETCH_CURRENCIES:
    allCurrencies = Object.keys(action.data).filter((currency) => currency !== 'USDT');
    return { ...state, expenses: allCurrencies };
  default:
    return state;
  }
};

export default wallet;
