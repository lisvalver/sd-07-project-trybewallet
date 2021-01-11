// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import initialState from './initialState';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  isLoading: false,
  exchangeRates: {},
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CHANGE':
    action.expenses.id = state.expenses.length;
    return { ...state, expenses: [...state.expenses, action.expenses], total: state.total + parseFloat(action.expenses.value) * parseFloat(action.expenses.exchangeRates[action.expenses.currency].ask) };
  case 'FETCH_SUCCESS':
    // const keys = Object.keys(action.payload);
    // const values = Object.values(action.payload);
    // const arrayResult = []
    // keys.map((teste, index) => {
    //   const object = {teste: values[index]};
    //   arrayResult[index] = object;
    // })
    return { ...state, currencies: Object.keys(action.payload).map((i) => action.payload[i]), exchangeRates: action.payload };
  case 'DELETE':
    return { ...state, expenses: state.expenses.filter((expense) => expense.id !== action.id) };
  default:
    return state;
  }
};

export default walletReducer;
