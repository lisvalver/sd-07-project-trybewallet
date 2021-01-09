const getAPI = (payload) => ({
  type: 'GETAPI',
  payload,
});

const requestAPI = () => ({
  type: 'REQUESTAPI',
});

const failedAPI = (error) => ({
  type: 'FAILEDAPI',
  error,
});

const fecthAction = () => (dispatch) => {
  dispatch(requestAPI());
  return fetch(
    'https://economia.awesomeapi.com.br/json/all',
  )
    .then((data) => data.json())
    .then((dados) => dispatch(getAPI(dados)))
    .catch((error) => dispatch(failedAPI(error)));
};

export default fecthAction;
