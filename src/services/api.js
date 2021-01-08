const getCurrencies = () => new Promise((resolve, reject) => {
  const api = 'https://economia.awesomeapi.com.br/json/all';
  fetch(api).then((response) => {
    response.json()
      .then((data) => resolve(data));
  }).catch((error) => reject(error));
});

export default getCurrencies;
