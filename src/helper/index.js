const endpoint = 'https://economia.awesomeapi.com.br/json/all';

async function fetchAPI() {
  const data = fetch(endpoint);
  const json = await data.json;
  return json;
}

export default fetchAPI;
