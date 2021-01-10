export const getCurrencies = async () => {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';

  try {
    const currenciesRes = await fetch(endPoint);
    return currenciesRes.json();
  } catch (error) {
    return error.response;
  }
};

export default getCurrencies;
