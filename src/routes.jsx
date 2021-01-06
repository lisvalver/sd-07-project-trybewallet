import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Login';
import Wallet from './pages/Wallet';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
    );
  }
}

export default Routes;
