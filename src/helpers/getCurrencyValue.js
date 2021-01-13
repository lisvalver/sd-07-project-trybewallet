const getCurrencyValue = (currencies, currency) => {
  const neWarray = Object.values(currencies)
    .filter((el) => el.code === currency).map((el) => el.ask);
  const final = Number.parseFloat(neWarray).toFixed(2);

  return final;
};

export default getCurrencyValue;
