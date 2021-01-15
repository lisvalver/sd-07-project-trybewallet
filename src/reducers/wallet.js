// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
const EXPENSES = 'EXPENSES';
const TOTAL = 'TOTAL';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

let id = '-1';
const wallet = (state = INITIAL_STATE, action) => {
  let allCurrencies;
  switch (action.type) {
  case FETCH_CURRENCIES:
    allCurrencies = Object.keys(action.data).filter((currency) => currency !== 'USDT');
    return { ...state, currencies: allCurrencies };
  case EXPENSES:
    id = parseFloat(id) + 1;
    return { ...state,
      expenses: [
        ...state.expenses, {
          id,
          value: action.value,
          description: action.description,
          currency: action.currency,
          method: action.method,
          tag: action.tag,
          exchangeRates: action.data,
        },
      ],
    };
  case TOTAL:
    return { ...state, total: action.total };
  default:
    return state;
  }
};

export default wallet;
