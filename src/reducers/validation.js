import { DATE_INVALID, DATE_VALID } from '../actions/validation';

const initialState = {
  validChanges: false,
};

export default function validation(state = initialState, action) {
  switch (action.type) {
  case DATE_VALID:
    return { ...state, validChanges: true };
  case DATE_INVALID:
    return { ...state, validChanges: false };
  default:
    return state;
  }
}
