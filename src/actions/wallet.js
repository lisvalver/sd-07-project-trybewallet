const wallet = (expenses, exchangeRates) => ({
  type: 'DESPESAS',
  expenses,
  exchangeRates,
});

export default wallet;
