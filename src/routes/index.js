import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Wallet } from '../pages';

export default function Routes() {
  return (
    <Switch>
      <Route path="/carteira" component={ Wallet } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
