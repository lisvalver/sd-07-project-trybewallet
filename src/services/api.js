export async function getTypes() {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await request.json();
  const currencyTypes = Object.values(response)
    .filter((value) => value.codein === 'BRL')
    .map((value) => value.code);
  return currencyTypes;
}

export async function getValues() {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  return response.json();
}
