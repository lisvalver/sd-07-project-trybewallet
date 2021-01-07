const currenciesURL = 'https://economia.awesomeapi.com.br/json/all';

const requestAPI = () => fetch(currenciesURL).then((response) => response.json());

export default requestAPI;