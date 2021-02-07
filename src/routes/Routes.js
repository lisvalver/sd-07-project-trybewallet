import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Wallet from '../pages/Wallet';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ LoginPage } />
    <Route exact path="/carteira" component={ Wallet } />
  </Switch>
);

export default Routes;
