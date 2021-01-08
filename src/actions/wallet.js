/*export default async function callAPI() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  let apiResult = await fetch(url);
  apiResult = await apiResult.json();
  return apiResult;
}*/
import api from '../service/api';

async function wallet(inputValues) {
  const apiResult = await api();
  return { type: 'NEW_EXPENSE', value: inputValues }
}

export default wallet;
