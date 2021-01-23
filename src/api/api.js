// export const requestApiCurrency = () => ({
//   type: 'REQUEST_QUESTIONS_API',
// });

// const requestApiCurrencySucess = (payload) => ({
//   type: 'REQUEST_CURRENCY_API_SUCCESS',
//   payload,
// });

// const requestApiCurrencyFail = (error) => ({
//   type: 'REQUEST_CURRENCY_API_FAIL',
//   error,
// });

// function requestApiAndAnsewrs() {
//   return (dispatch) => {
//     dispatch(requestApiCurrency());
//     return fetch('https://economia.awesomeapi.com.br/json/all')
//       .then((response) => {
//         response.json().then(
//           (data) => dispatch(requestApiCurrencySucess(data)),
//           (error) => dispatch(requestApiCurrencyFail(error)),
//         );
//       });
//   };
// }

// export default requestApiAndAnsewrs;
