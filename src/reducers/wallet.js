// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
};

export const WALLET = 'WALLET';

export function wallet(state = initialState, action) {
  switch (action.type) {
  case WALLET:
    return state;
  default:
    return state;
  }
}
