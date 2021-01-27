// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const InitialState = { currencies: [], expenses: [] };

const wallet = (state = InitialState, action) => {
  switch (action.type) {
  case 'EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.data],
    };
  default: return state;
  }
};

export default wallet;
