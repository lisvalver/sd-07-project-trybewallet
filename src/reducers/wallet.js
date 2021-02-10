// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_WALLET = {
  isFetching: false,
  currencies: [],
  expenses: [],
  expenseValueConverted: 0,
};

const TYPE = {
  REQUEST_IN_PROGRESS: 'REQUEST_IN_PROGRESS',
  CURRENCIES: 'CURRENCIES',
  EXPENSES: 'EXPENSES',
  AMOUNT: 'AMOUNT',
  DELETE: 'DELETE',
  DECREMENT: 'DECREMENT',
};

function walletReducer(state = INITIAL_WALLET, action) {
  switch (action.type) {
  case TYPE.CURRENCIES:
    return ({
      ...state,
      currencies: action.value,
      isFetching: false,
    });
  case TYPE.EXPENSES:
    return ({
      ...state,
      expenses: [...state.expenses, action.value],
      isFetching: false,
    });
  case TYPE.REQUEST_IN_PROGRESS:
    return ({ ...state, isFetching: true });
  case TYPE.AMOUNT: {
    let amount = 0;
    amount = state.expenseValueConverted + action.value;
    return ({ ...state,
      expenseValueConverted: amount,
    });
  }
  case TYPE.DECREMENT: {
    let amount = 0;
    amount = state.expenseValueConverted - action.value;
    return ({ ...state,
      expenseValueConverted: amount,
    });
  }
  case TYPE.DELETE: {
    console.log(action);
    return ({ ...state,
      expenses: [...action.currentExpense],
    });
  }
  default:
    return state;
  }
}

export default walletReducer;
