const INITIAL_STATE = {
  user: {
    email: '',
    password: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
    lastExchangeRates: {},
    isFetching: false,
    nextId: 0,
    total: 0,
    currentExpense: {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      id: -1,
    },
    editMode: false,
    validateExpense: {
      value: { msg: 'O valor da despesa deve ser maior que zero.', status: false },
      description: { msg: 'Informe a descrição da despesa.', status: false },
      currency: { msg: 'Informe a moeda da despesa.', status: false },
      method: { msg: 'Informe método de pagamento da despesa.', status: false },
      tag: { msg: 'Informe a categoria da despesa.', status: false },
    },
    canValidate: false,
  },
};

export default INITIAL_STATE;
