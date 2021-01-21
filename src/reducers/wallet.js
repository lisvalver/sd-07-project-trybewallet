import { REQUEST_MOEDA,
  REQUEST_MOEDA_SUCESS,
  REQUEST_FAIL,
  CHOOSED_CURRENCY,
  ADD_EXPENSES,
  DELET_EXPENSES,
  SET_CONVERTED_VALUES,
  EDIT_EXPENSES,
  DISPATCH_EDIT_EXPENSES } from '../actions/index';

const INICIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  curr: 'BRL',
  valorConvertido: 0,
  editing: false,
  target: 0,
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
    return {
      ...state,
      valorConvertido: parseFloat(state.valorConvertido) + parseFloat(action.payload),
    };
  case DELET_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((itemAtual) => itemAtual !== action.payload),
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      editing: true,
      target: action.id,
    };
  case DISPATCH_EDIT_EXPENSES:
    const id = action.id;
    return {
      ...state,
      editing: false,
      expenses: state.expenses.map((expense) =>  expense.id === id ? action.payload : expense),
    };
  default:
    return state;
  }
};

export default userWallet;
