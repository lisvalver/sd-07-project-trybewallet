// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'EMAIL_UPDATE_VALUE':
    return { ...state, newValue: action.newValue };
  default:
    return state;
  }
};

export default wallet;
