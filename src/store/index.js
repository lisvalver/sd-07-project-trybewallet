import { createStore } from 'redux';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  window.__REDUX__DEVTOOLS_EXTENTIONS__
  && window.__REDUX__DEVTOOLS_EXTENTIONS__(),
);

export default store;
