const initialState = {
  currencies: {},
  error: '',
  expenses: [],
  total: 0,
};

const currencies = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      email: action.email,
      logged: true,
    };
  default:
    return state;
  }
};

export default currencies;
