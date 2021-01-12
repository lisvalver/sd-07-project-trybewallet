const updateAPI = (responseAPI) => ({
  type: 'UPDATEAPI',
  responseAPI,
});

const failedAPI = (error) => ({
  type: 'FAILEDAPI',
  error,
});

const fecthActionUpdate = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((data) => data.json())
  .then((data) => dispatch(updateAPI(data)))
  .catch((error) => dispatch(failedAPI(error)));

export default fecthActionUpdate;
