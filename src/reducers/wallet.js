// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const CURRENCIES = 'CURRENCIES';
const EXPENSES = 'EXPENSES';
const SUM = 'SUM';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [
      // {
      //   id: -1,
      //   value: 0,
      //   description: '',
      //   currency: 'USD',
      //   method: '',
      //   tag: '',
      //   exchangeRates: {},
      // },
    ],
    sum: 0,
  },
};

let firstId = '-1';
const wallet = (state = INITIAL_STATE.wallet, action) => {
  let allCurrencies;

  switch (action.type) {
  case CURRENCIES:
    allCurrencies = Object.values(action.payload).filter(
      (element) => element.codein !== 'BRLT',
    );
    return {
      ...state, currencies: [...allCurrencies],
    };
  case EXPENSES:
    firstId = parseFloat(firstId) + 1;
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: firstId,
          // state.expenses[state.expenses.length - 1].id + 1,
          value: action.value,
          description: action.description,
          currency: action.currency,
          method: action.method,
          tag: action.tag,
          exchangeRates: action.data,
        },
      ],
    };
  case SUM:
    return { ...state, sum: action.payload };
  case 'DELETE':
    return {
      ...state,
      expenses: state.expenses.filter((element) => element.id !== action.payload),
    };
  default:
    return state;
  }
};

export default wallet;
