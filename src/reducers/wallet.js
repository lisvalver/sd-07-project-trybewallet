const INITIAL_STATE = {};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case '':
    return {};
  default:
    return state;
  }
}

export default walletReducer;
