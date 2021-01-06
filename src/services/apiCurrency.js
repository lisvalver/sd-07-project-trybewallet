const endPointAll = 'https://economia.awesomeapi.com.br/json/all';

const apiCurrency = async () => {
  try {
    const request = await fetch(endPointAll);
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default apiCurrency;
