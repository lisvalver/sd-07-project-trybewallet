import React from 'react';
import { Route } from 'react-router-dom';
import { Login, Wallet } from './pages';

const Routes = () => (
  <>
    <Route exact path="/" component={ Login } />
    <Route path="/carteira" component={ Wallet } />
  </>
);

export default Routes;
