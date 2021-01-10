// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    expenses: [],
    error: '',
    isFetching: '',
    currencies: {},
  },
};

const RECEIVE_FAILURE = 'RECEIVE_FAILURE';
const RECEIVE_SUCCESS = 'RECEIVE_SUCCESS';
const REQUEST = 'REQUEST';

const wallet = (state = INITIAL_STATE.wallet, action) => {
  // console.log('received action:', action);
  switch (action.type) {
  case REQUEST:
    return {
      ...state,
      isFetching: true,
      error: '',
    };
  case RECEIVE_SUCCESS:
    return {
      ...state,
      isFetching: false,
      currencies: { ...action.currencies },
    };
  case RECEIVE_FAILURE:
    return {
      ...state,
      isFetching: false,
      error: 'erro',
    };
  default:
    return state;
  }
};

export default wallet;
