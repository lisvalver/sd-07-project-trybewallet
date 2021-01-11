const getCurrencyValue = (currencies, currency) => {
  const neWarray = Object.values(currencies)
    .filter((el) => el.code === currency).map((el) => el.ask);
  return Number.parseFloat(neWarray).toFixed(1);
};

export default getCurrencyValue;
