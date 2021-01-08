// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  id: 0,
  currencies: ['USD', 'BRL'],
  expenses: [],
  apiData: {},
};

const walletDetails = (state = initialState, action) => {
  switch (action.type) {
  case 'DATA_FETCHED':
    return { ...state, apiData: action.payload };
  case 'STORE_CURRENCIES':
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
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.payload)],
    };
  default:
    return state;
  }
};

export default walletDetails;
