// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_SUCCESS,
  IS_FETCHING,
  CREATE_EXPENSE,
  DELETE_EXPENSE,
  EDIT_START,
  EDIT_END,
  EDIT_EXPENSE_CURRENT,
} from '../actions';

const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  editExpense: false,
  expenseId: 0,
  randomId: 0,
};

const editExpenses = (array, id, editExpense) => {
  console.log('Chamou!');
  console.log(array);
  console.log(id);
  console.log(editExpense);
  const { value, currency, method, tag, description, valueCurrency } = editExpense;

  array.forEach((element) => {
    if (element.id === Number(id)) {
      element.id = Number(id);
      element.value = value;
      element.description = description;
      element.currency = currency;
      element.method = method;
      element.tag = tag;
      element.nameAsk = valueCurrency;
    }
  });
  return array;
};

const wallet = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_FETCHING:
    return ({
      ...state,
      isFetching: true,
    });
  case REQUEST_SUCCESS:
    return ({
      ...state,
      isFetching: false,
      currencies: [{ ...action.currencies }],
    });
  case CREATE_EXPENSE:
    return ({
      ...state,
      expenses: [...state.expenses, action.expenses],
      randomId: state.randomId + 1,
    });
  case DELETE_EXPENSE:
    return ({
      ...state,
      expenses: action.expenses,
    });
  case EDIT_START:
    return ({
      ...state,
      editExpense: true,
      expenseId: action.id,
    });
  case EDIT_END:
    return ({
      ...state,
      editExpense: false,
    });
  case EDIT_EXPENSE_CURRENT:
    return ({
      ...state,
      expenses: editExpenses(state.expenses, state.expenseId, action.uptadeExpense),
    });
  default:
    return state;
  }
};

export default wallet;
