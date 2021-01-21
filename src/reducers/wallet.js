import types from '../actions/types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  sum: 0,
  isEditing: false,
  editIndice: '',
};

const idd = -1;
let id = idd;

export default function Wallet(state = INITIAL_STATE, action) {
  const newState = state.expenses.filter((expense) => expense.id !== action.id);
  switch (action.type) {
  case types.USER_CURRENCIES: {
    return {
      ...state, currencies: [...action.currencie],
    };
  }
  case types.USER_EXPENCIES: {
    id += 1;
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.expenses, id, exchangeRates: action.currencie }],
    };
  }
  case types.USER_VALUE: {
    return {
      ...state, sum: action.sumValue,
    };
  }
  case types.USER_REMOVE: {
    return {
      ...state, expenses: newState,
    };
  }
  case types.USER_EDIT: {
    return {
      ...state,
      isEditing: action.isEditing,
      editIndice: action.index,
    };
  }
  case types.USER_IS_EDITING: {
    const indice = state.editIndice;
    const prevValues = [...state.expenses];
    prevValues[indice] = { ...action.newValues,
      exchangeRates: state.expenses[indice].exchangeRates };
    console.log(prevValues);
    return {
      ...state,
      expenses: [
        ...prevValues,
      ],
    };
  }
  default: {
    return state;
  }
  }
}
