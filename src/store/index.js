import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// no creatStore precisa passar 2 configurações por isso usar o compose
// apllyMiddleware e o dev tools
export default createStore(rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ));
// ref: https://stackoverflow.com/questions/53514758/redux-typeerror-cannot-read-property-apply-of-undefined
