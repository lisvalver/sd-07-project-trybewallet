const fetchApi = async () => {
  try {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const fetchReturn = await fetch(endpoint);
    const responseJson = await fetchReturn.json();
    return responseJson;
  } catch (error) {
    alert(error);
  }
};
