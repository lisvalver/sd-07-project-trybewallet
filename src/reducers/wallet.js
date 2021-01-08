const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};
function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  default:
    return state;
  }
}

export default walletReducer;

// controlar os valores do formulario de forma a armazenar o valor na store,
// mas antes fazer o estado inicial do componente
