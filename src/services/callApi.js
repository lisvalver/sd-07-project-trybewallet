const getApi = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const transformJson = await response.json();
  return transformJson;
};

export default getApi;
