import {
  REQUEST_CURRENCY,
  CURRENCY_SUCESS,
  CURRENCY_FAIL,
  REQUEST_CURRENCY_OBJ,
  CURRENCY_OBJ_SUCESS,
  CURRENCY_OBJ_FAIL,
  CHANGE_EXPENSES,
  DELETE_EXPENSES_ROW,
  TOTAL_EXPENSES,
  EDIT_ROW_OBJ,
  NEW_EXPENSES,
} from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  editExpenses: {},
  editing: false,
  currenciesObj: {},
  totalExpenses: 0,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case CHANGE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSES_ROW:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.payload),
    };
  case TOTAL_EXPENSES:
    return {
      ...state,
      totalExpenses: action.payload,
    };
  case REQUEST_CURRENCY:
    return {
      ...state,
      loading: true,
    };
  case CURRENCY_SUCESS:
    return {
      ...state,
      currencies: [...state.currencies, ...action.payload],
      loading: false,
    };
  case CURRENCY_FAIL:
    return {
      ...state,
      loading: false,
    };
  case REQUEST_CURRENCY_OBJ:
    return {
      ...state,
      loading: true,
    };
  case CURRENCY_OBJ_SUCESS:
    return {
      ...state,
      currenciesObj: action.payload,
      loading: false,
    };
  case CURRENCY_OBJ_FAIL:
    return {
      ...state,
      loading: false,
    };
  case EDIT_ROW_OBJ:
    return {
      ...state,
      editExpenses: action.payload,
      editing: true,
    };
  case NEW_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      ],
    };
  default:
    return state;
  }
}
