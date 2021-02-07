import * as actionTypes from '../actions/actionTypes'

const initialState = {
  email: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_EMAIL:
      return {
        ...state,
        email: action.email
      }
      default: return state;
  }
}

export default reducer;
