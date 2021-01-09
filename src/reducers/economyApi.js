const INITIAL_STATE = [
  {
    isFetching: false,
    payload: {},
    error: '',
  },
];

function economyApi(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GETAPI':
    return { ...state, isFetching: true };
  case 'REQUESTAPI':
    return { ...state, payload: action.payload, isFetching: false };
  case 'FAILEDAPI':
    return { ...state, error: action.payload, isFetching: false };
  default:
    return state;
  }
}

export default economyApi;
