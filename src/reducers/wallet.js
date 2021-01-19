import { REQUEST_MOEDA,
  REQUEST_MOEDA_SUCESS,
  REQUEST_FAIL,
  CHOOSED_CURRENCY,
  ADD_EXPENSES,
  DELET_EXPENSES } from '../actions/index';

const INICIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  curr: 'BRL',
};

const userWallet = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_MOEDA:
    return { ...state, isFetching: true };
  case REQUEST_MOEDA_SUCESS:
    return { ...state, isFetching: false, currencies: { ...action.payload } };
  case REQUEST_FAIL:
    return { ...state, isFetching: false, currencies: { ...action.error } };
  case CHOOSED_CURRENCY:
    return { ...state, curr: action.payload };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELET_EXPENSES:
    console.log(action.payload);
    return {
      ...state,
      expenses: state.expenses.filter((itemAtual) => itemAtual !== action.payload),
    };
  default:
    return state;
  }
};

export default userWallet;
