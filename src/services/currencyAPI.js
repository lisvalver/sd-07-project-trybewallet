const getCurrencies = async (endpoint) => {
  const currencies = await fetch(endpoint)
    .then((response) => response.json());
  return currencies;
};

export default getCurrencies;
