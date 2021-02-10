import { LOGIN } from '../actions';

export default function user(state, action) {
  switch (action.type) {
  case LOGIN:
    return (
      {
        ...state,
        user: { email: action.payload },
      }
    );

  default:
    return state;
  }
}
