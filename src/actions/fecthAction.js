const requestAPI = () => ({
  type: 'REQUESTAPI',
});

const getAPI = (responseAPI, currency) => ({
  type: 'GETAPI',
  responseAPI,
  currency,
});

const failedAPI = (error) => ({
  type: 'FAILEDAPI',
  error,
});

const fecthAction = () => (dispatch) => {
  dispatch(requestAPI());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((data) => data.json())
    .then((data) => {
      delete data.USDT;
      const keys = Object.keys(data);
      return dispatch(getAPI(data, keys));
    })
    .catch((error) => dispatch(failedAPI(error)));
};

export default fecthAction;
