const endPoint = 'https://economia.awesomeapi.com.br/json/all';

const apiCurrency = async () => {
  try {
    const request = await fetch(endPoint);
    const response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
};

export default apiCurrency;
