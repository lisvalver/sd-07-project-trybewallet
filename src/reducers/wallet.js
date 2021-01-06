// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  wallet: {
    currencies: [],
    expenses: [],
  },
  apiData: {},
};

const walletDetails = (state = initialState, action) => {
  switch (action.type) {
  case 'DATA_FETCHED':
    return { ...state, apiData: action.payload };
  default:
    return state;
  }
};

export default walletDetails;
