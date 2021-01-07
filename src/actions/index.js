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

export default { addUser, addExpenses };
