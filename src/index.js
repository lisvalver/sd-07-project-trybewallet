import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import Wallet from './pages/Wallet';
import store from './store';

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <Route exact path="/" component={ App } />
      <Route exact path="/carteira" component={ Wallet } />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
