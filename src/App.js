import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Wallet } from './pages';
import './App.css';

const App = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route path="/carteira" component={ Wallet } />
  </Switch>
);

export default App;
