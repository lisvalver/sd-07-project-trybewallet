import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// const initialState = {
//   user: {
//     email: '',
//   },
//   wallet: {
//     currencies: [],
//     expenses: [],
//   },
// };

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
