// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADDEXPENSE, DELEXPENSE, EDITREQUEST, EDITEXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
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
  case EDITEXPENSE:
    return { ...state,
      expenses: [...state.expenses
        .filter(({ id }) => id !== action.id), action.objectExpense]
        .sort((a, b) => {
          const ascend = 1;
          const descend = -1;
          if (a.id > b.id) return ascend;
          return descend;
        }),
      editor: false,
      idToEdit: 0 };
  case EDITREQUEST:
    return { ...state, idToEdit: action.id, editor: action.boolean };
  default:
    return state;
  }
}
