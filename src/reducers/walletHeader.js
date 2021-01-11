import { EDITING, NOT_EDITING } from '../actions';

const walletHeaderInitialState = {
  isEditing: false,
};

function walletHeaderReducer(state = walletHeaderInitialState, action) {
  switch (action.type) {
  case EDITING:
    return {
      isEditing: action.payload,
    };
  case NOT_EDITING:
    return {
      isEditing: action.payload,
    };
  default:
    return state;
  }
}

export default walletHeaderReducer;
