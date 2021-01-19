import { ADDTOTAL } from '../actions/index';

const INITIAL_STATE = {
  total: 0,
  id: 0,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADDTOTAL:
    return (
      {
        ...state,
        total: 0,
      }
    );
  default:
    return state;
  }
}
