const API_CURRENCY = 'https://economia.awesomeapi.com.br';

const apiCurrency = async () => {
  try {
    const request = await fetch(`${API_CURRENCY}/json/all`);
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default apiCurrency;
