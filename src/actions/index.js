export const LOGIN_OK = 'LOGIN_OK';
export const REQUEST_MOEDA = 'REQUEST_MOEDA';
export const REQUEST_MOEDA_SUCESS = 'REQUEST_MOEDA_SUCESS';
export const REQUEST_FAIL = 'REQUEST_FAIL';

export const currentLogin = (user) => ({
  type: 'LOGIN_OK',
  user,
});

export const requestMoeda = () => ({
  type: 'REQUEST_MOEDA',
});

const requestMoedaSucess = (payload) => ({
  type: 'REQUEST_MOEDA_SUCESS',
  payload,
});

const requestMoedaFail = (error) => ({
  type: 'REQUEST_FAIL',
  error,
});

export function fetchMoedaAPI() {
  return (dispatch) => {
    dispatch(requestMoeda());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => {
        response.json().then(
          (data) => dispatch(requestMoedaSucess(data)),
          (error) => dispatch(requestMoedaFail(error)),
        );
      });
  };
}

/* Object.keys(currencies)
.filter((coin) => coin !== 'USDT')  */
