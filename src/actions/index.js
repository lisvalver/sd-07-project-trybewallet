const LOGIN_OK = 'LOGIN_OK';
const REQUEST_MOEDA = 'REQUEST_MOEDA';
const REQUEST_MOEDA_SUCESS = 'REQUEST_MOEDA_SUCESS';
const REQUEST_MOEDA_FAIL = 'REQUEST_MOEDA_FAIL';

export const currentLogin = (user) => ({
  type: 'LOGIN_OK',
  user,
});

const requestMoeda = () => ({
  type: 'REQUEST_MOEDA',
  payload,
});

const requestMoedaSucess = () => ({
  type: 'REQUEST_MOEDA_SUCESS',
  payload,
});

const requestMoedaFail = () => ({
  type: 'REQUEST_MOEDA_FAIL',
  error,
});

export const fetchMoedaAPI = () => ({
  return (dispatch) => {
    dispatch(requestMoeda());
      return fetch('https://economia.awesomeapi.com.br/json/all')
        .then(
          (data) => dispatch(requestMoedaSucess(data)),
          (error) => dispatch(requestMoedaFail(error))
        )
  }
});

/* Object.keys(currencies)
.filter((coin) => coin !== 'USDT')  */
