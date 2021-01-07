const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  requisitar: false,
};
const REQUISITAR_MOEDAS = 'REQUISITAR_MOEDAS';
const SUCESSO = 'SUCESSO';

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUISITAR_MOEDAS:
      return { ...state, requisitar: true };
    case SUCESSO:
      return {
        ...state,
        requisitar: false,
        currencies: { ...action.currencies },
      };
    default:
      return state;
  }
}
export default wallet;
