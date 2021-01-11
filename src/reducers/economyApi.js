const INITIAL_STATE = [
  {
    isFetching: false,
    responseAPI: {},
    currency: '',
    error: '',
  },
];

function economyApi(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUESTAPI':
    return { ...state, isFetching: true };
  case 'GETAPI':
    return {
      ...state,
      responseAPI: action.responseAPI,
      currency: action.currency,
      isFetching: false,
    };
  case 'FAILEDAPI':
    return { ...state, error: action.error, isFetching: false };
  default:
    return state;
  }
}

export default economyApi;
