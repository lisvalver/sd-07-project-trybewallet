import {
  REQUEST_SUCESS,
  REQUEST_FAILED,
  ADD,
  REMOVE,
  TOTAL,
  UPDATE,
  EDIT,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  saveOrEdit: false,
  editId: null,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case REQUEST_SUCESS:
    return { ...state, currencies: action.payload };
  case REQUEST_FAILED:
    return { ...state, error: action.payload };
  case REMOVE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => action.id !== expense.id),
    };
  case TOTAL:
    return { ...state,
      total: state.expenses.reduce((acc, { exchangeRates, currency, value }) => {
        const total = parseFloat(value * exchangeRates[currency].ask);
        return acc + total;
      }, 0) };
  case EDIT:
    return { ...state,
      edit: !state.edit,
      editId: action.id,
    };
  case UPDATE:
    return { ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return action.payload;
        }
        return expense;
      }),
    };
  default:
    return state;
  }
};

export default wallet;

/* https://github.com/tryber/sd-07-project-trybewallet/pull/136
https://github.com/tryber/sd-07-project-trybewallet/pull/135/files
https://github.com/tryber/sd-07-project-trybewallet/pull/126/files
plantão do zambeli + origamid Redux Toolkit */
