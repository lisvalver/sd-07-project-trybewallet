// Coloque aqui suas actions

const addUser = (email, password) => ({
  type: 'USER',
  payload: {
    email,
    password,
  },
});

const addExpenses = (value, currency, method, tag, description) => ({
  type: 'EXPENSER',
  payload: {
    value,
    currency,
    method,
    tag,
    description,
  },
});

const requireCurrenciesFail = (error) => ({
  type: 'REQUIRE_FAIL',
  payload: error,
});

const requireCurrenciesSucess = (currencies) => ({
  type: 'REQUIRE_CURRENCE_SUCESS',
  payload: currencies,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currencies = await response.json();
      dispatch(requireCurrenciesSucess(currencies));
    } catch (error) {
      dispatch(requireCurrenciesFail(error));
    }
  };
}

export {
  addUser,
  addExpenses,
};
