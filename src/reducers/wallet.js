// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADDEXPENSE, DELEXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
  case ADDEXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          ...action.objectExpense,
          id: state.expenses.length,
        },
      ],
    };
  case DELEXPENSE:
    return { ...state, expenses: state.expenses.filter(({ id }) => id !== action.id) };
  default:
    return state;
  }
}
