const INITIAL_STATE = [
  {
    isFetching: false,
    payload: {},
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
      payload: action.payload,
      currency: action.currency,
      isFetching: false,
    };
  case 'FAILEDAPI':
    return { ...state, error: action.payload, isFetching: false };
  default:
    return state;
  }
}

export default economyApi;
