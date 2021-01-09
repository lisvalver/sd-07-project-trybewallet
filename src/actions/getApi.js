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

const fecthEconomy = () => async (dispatch) => {
  dispatch(requestAPI());

  const apiResponse = await fetch(
    'https://economia.awesomeapi.com.br/json/all',
  )
    .then((data) => dispatch(getAPI(data.json())))
    .catch((error) => dispatch(failedAPI(error)));

  return apiResponse;
};

export default fecthEconomy;
