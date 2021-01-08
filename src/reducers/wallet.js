// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const CURRENCIES = 'CURRENCIES';
const EXPENSES = 'EXPENSES';
// const CURRENCIES_EXPENSES = 'CURRENCIES_EXPENSES';

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

const wallet = (state = INITIAL_STATE, action) => {
  let allCurrencies;

  switch (action.type) {
  case CURRENCIES:
    allCurrencies = Object.values(action.payload).filter(
      (element) => element.codein !== 'BRLT',
    );
    return {
      ...state,
      wallet: { ...state.wallet, currencies: [...allCurrencies] },
    };
  case EXPENSES:
    return {
      ...state,
      wallet: {
        ...state.wallet,
        expenses: [
          ...state.wallet.expenses,
          {
            id:
              state.wallet.expenses[state.wallet.expenses.length - 1].id + 1,
            value: action.value,
            description: action.description,
            currency: action.currency,
            method: action.method,
            tag: action.tag,
          },
        ],
      },
    };
  default:
    return state;
  }
};

export default wallet;
