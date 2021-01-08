// Coloque aqui suas actions

export const loginAction = (email) => ({ type: 'LOGIN', payload: email });

export const logAction = (email) => ({ type: 'LOG', payload: email });

export const sapoGrande = (state) => ({
  type: 'UPDATE_EXPENSES',
  payload: state,
});

// wallet

const requestCurrency = () => ({
  type: 'REQUEST_CURRENCIES',
});

const getCurrency = (dataJson) => ({
  type: 'GET_CURRENCIES',
  payload: dataJson,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrency());
  const data = await fetch('https://economia.awesomeapi.com.br/json/all');
  const dataJson = await data.json();
  const currencies = await Object.keys(dataJson).filter(
    (currency) => currency !== 'USDT',
  );
  dispatch(getCurrency(currencies));
};

// fazer req api e incrementar como a payload(state) será armazenado no state do app
const updateExpenses = (expenses) => ({
  type: 'UPDATE_EXPENSES',
  payload: expenses,
});

const incrementId = () => ({
  type: 'INCREMENT_ID',
});

export const fetchExpenses = (state) => async (dispatch) => {
  dispatch(requestCurrency());
  const data = await fetch('https://economia.awesomeapi.com.br/json/all');
  const dataJson = await data.json();
  delete dataJson.USDT;
  const newState = { ...state, exchangeRates: dataJson };
  dispatch(updateExpenses(newState));
  dispatch(incrementId());
};

export const deleteExpenseAction = (id) => {
  console.log(`chegamos na action com o id ${id}`);
  return { type: 'DELETE_EXPENSE', payload: id };
};
