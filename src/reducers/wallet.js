// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_WALLET = {
  isFetching: false,
  currencies: [],
  expenses: [],
  expenseValueConverted: 0,
  editing: false,
  idToEdit: undefined,
};

const TYPE = {
  REQUEST_IN_PROGRESS: 'REQUEST_IN_PROGRESS',
  CURRENCIES: 'CURRENCIES',
  EXPENSES: 'EXPENSES',
  AMOUNT: 'AMOUNT',
  DELETE: 'DELETE',
  DECREMENT: 'DECREMENT',
  EDIT: 'EDIT',
  UPDATE: 'UPDATE',
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

    // console.log('action.value', action.value);
    // console.log('estado atual', state.expenseValueConverted);

    amount = state.expenseValueConverted - action.value;

    // console.log('amount', amount);

    return ({ ...state,
      expenseValueConverted: amount,
    });
  }
  case TYPE.DELETE: {
    return ({ ...state,
      expenses: [...action.currentExpense],
    });
  }
  case TYPE.EDIT:
    return ({
      ...state,
      editing: true,
      idToEdit: action.id,
    });
  case TYPE.UPDATE: {
    const id = state.idToEdit;
    const expensesUp = [...state.expenses];
    expensesUp[id] = action.value;
    return ({
      ...state,
      expenses: expensesUp,
      editing: false,
    });
  }
  default:
    return state;
  }
}

export default walletReducer;
