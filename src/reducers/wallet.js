// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.payload] };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== parseInt(action.payload, 10),
      ),
    };
  default:
    return state;
  }
};

export default wallet;
