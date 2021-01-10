import { addCurrencies } from './wallet';
// import { fetchSuccess } from './wallet';

// const axios = require('axios');

// 1 - criar as constante para referenciar as possibilidades de chamada API

// export const FETCH_SUCCESS = 'FETCH_SUCCESS';

// 2 - criar action creators para cada situação da requisição API

// function fetchSuccess(data) {
//   return {
//     type: FETCH_SUCCESS,
//     payload: data,
//   };
// }

// function fetchAPI() {
//   return (dispatch) => {
//     axios
//       .get('https://economia.awesomeapi.com.br/json/all')
//       .then((response) => {
//         dispatch(fetchSuccess(response));
//       });
//   };
// }

const fetchAPI = () => async (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await (await (await fetch(url)).json());
  dispatch(addCurrencies(response));
  return response;
};

export default fetchAPI;
// agora criar reducer function...
