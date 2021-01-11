// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  id: 0,
  currencies: [],
  expenses: [],
  apiData: {},
};
const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'FETCH_API':
    return { ...state, apiData: action.payload };
  case 'CURRENCIES':
    return {
      ...state,
      wallet: { ...state, currencies: action.payload },
    };
  case 'NEW_EXPENSE':
    return {
      ...state,
      id: state.id + 1,
      expenses: [...state.expenses, { ...action.payload, id: state.id }],
    };
  case 'DELETE':
    return {
      ...state,
      expenses: [...state.expenses
        .filter((itemExpense) => itemExpense.id !== action.payload)],
    };
  default:
    return state;
  }
};

export default wallet;
