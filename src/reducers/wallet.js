// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const InitialState = { currencies: [], expenses: [] };

const wallet = (state = InitialState, action) => {
  console.log(action, state);

  switch (action.type) {
  case 'EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.data],
    };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.data),
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      expenses: state.expenses
        .map((expense) => {
          if (action.data.id === expense.id) return action.data;
          return expense;
        }),
    };
  default: return state;
  }
};

export default wallet;
