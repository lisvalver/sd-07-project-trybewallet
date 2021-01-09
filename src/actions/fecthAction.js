const requestAPI = () => ({
  type: 'REQUESTAPI',
});

const getAPI = (payload) => ({
  type: 'GETAPI',
  payload,
});

const failedAPI = (error) => ({
  type: 'FAILEDAPI',
  error,
});

const fecthAction = () => (dispatch) => {
  dispatch(requestAPI());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((data) => dispatch(getAPI(data.json())))
    .catch((error) => dispatch(failedAPI(error)));
};

export default fecthAction;
