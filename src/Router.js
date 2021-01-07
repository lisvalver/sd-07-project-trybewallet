import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/wallet/:id" render={ (props) => <Wallet { ...props } /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
