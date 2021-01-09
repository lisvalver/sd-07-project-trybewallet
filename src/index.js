import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux' // colocou aqui
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // oq é essa passagem de store aqui.
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
