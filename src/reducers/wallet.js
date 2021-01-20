import { REQUEST_MOEDA,
  REQUEST_MOEDA_SUCESS,
  REQUEST_FAIL,
  CHOOSED_CURRENCY,
  ADD_EXPENSES,
  DELET_EXPENSES,
  SET_CONVERTED_VALUES } from '../actions/index';

const INICIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  curr: 'BRL',
  valorConvertido: 0,
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
  case SET_CONVERTED_VALUES:
    console.log(action.payload);
    return {
      ...state,
      valorConvertido: parseFloat(state.valorConvertido) + parseFloat(action.payload),
    };
  case DELET_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((itemAtual) => itemAtual !== action.payload),
    };
  default:
    return state;
  }
};

export default userWallet;
