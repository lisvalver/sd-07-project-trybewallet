// Coloque aqui suas actions

const addUser = (email, password) => ({
  type: 'USER',
  payload: {
    email,
    password,
  },
});

const addExpenses = (cash, currency, methodInput, tagInput, infor) => ({
  type: 'EXPENSER',
  payload: {
    cash,
    currency,
    methodInput,
    tagInput,
    infor,
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

const sumTotalValue = () => ({
  type: 'SUM',
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
  sumTotalValue,
};
