export default async () => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endpoint);
  const json = await response.json();
  if (response.ok) return Promise.resolve(json);
  return Promise.reject(json);
};
