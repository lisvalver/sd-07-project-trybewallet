export async function getTypes() {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  return response.json();
}

export async function getValue() {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  return response.json();
}
