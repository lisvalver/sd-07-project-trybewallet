export async function callAPI() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  let apiResult = await fetch(url);
  apiResult = await apiResult.json();
  return apiResult; 
}
