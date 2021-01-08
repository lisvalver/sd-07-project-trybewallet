// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const CURRENCIES = 'CURRENCIES';
const EXPENSES = 'EXPENSES';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [
      {
        id: -1,
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
        exchangeRates: {},
      },
    ],
  },
};

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
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id:
            state.expenses[state.expenses.length - 1].id + 1,
          value: action.value,
          description: action.description,
          currency: action.currency,
          method: action.method,
          tag: action.tag,
        },
      ],
    };
  default:
    return state;
  }
};

export default wallet;
