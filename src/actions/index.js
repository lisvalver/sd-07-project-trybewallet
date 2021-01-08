// Coloque aqui suas actions

const addUser = (email, password) => ({
  type: 'USER',
  payload: {
    email,
    password,
  },
});

const addExpenses = (cash, currency, methodInput, tagInput, infor, id) => ({
  type: 'EXPENSER',
  payload: {
    cash,
    currency,
    methodInput,
    tagInput,
    infor,
    id,
  },
});

const requireCurrencies = () => ({
  type: 'REQUIRE_CURRENCE',
});

const requireCurrenciesFail = (error) => ({
  type: 'REQUIRE_FAIL',
  payload: error,
});

const requireCurrenciesSucess = (currencies) => ({
  type: 'REQUIRE_CURRENCE_SUCESS',
  payload: currencies,
});

const readCurrenciesValue = (currenciesAndValue) => ({
  type: 'REQUIRE_CURRENCE_AND_VALUE',
  payload: currenciesAndValue,
});

// const expensesSum = (total) => ({
//   type:'SUM',
//   payload:total
// })

// export function totalSum ( expenses, currenciesAndValue ) {
//   const expensesBrl = expenses.map(element => {
//     const currencyCurrent = currenciesAndValue.find((value) => {return element.currency === Object.keys(value)});
//     const cashValue = Object.values(currencyCurrent)[0] * element.cash;
//     return cashValue
//   })
// }

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      dispatch(requireCurrencies());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const currencies = Object.keys(data);
      dispatch(requireCurrenciesSucess(currencies));
      const currenciesAndValue = Object.entries(data).map((element) => {
        const key = element[0];
        const valueBid = element[1].bid;
        return { [key]: valueBid };
      });
      dispatch(readCurrenciesValue(currenciesAndValue));
    } catch (error) {
      dispatch(requireCurrenciesFail(error));
    }
  };
}

export {
  addUser,
  addExpenses,
};
