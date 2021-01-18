// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  inEditing: false,
  idInEditing: 0,
};

function wallet(state = INITIAL_STATE, action) {
  const { expense, updatedExpenses, type, bool } = action;
  switch (type) {
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, expense],
    };
  case 'UPDATE_EXPENSES':
    return {
      ...state,
      expenses: updatedExpenses,
    };
  case 'EDITING_EXPENSE':
    return { ...state, inEditing: bool, idInEditing: action.idInEditing };
  case 'EDITED_EXPENSE':
    return {
      ...state,
      inEditing: bool,
      expenses: [...state.expenses.map((elem) => {
        if (elem.id === action.idInEditing) {
          return {
            ...elem,
            expense,
          };
        }
        return elem;
      })],
    };
  default:
    return state;
  }
}

export default wallet;
