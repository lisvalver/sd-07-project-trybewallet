import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/wallet" component={Wallet} />
      </Switch>
    </div>
  );
}

export default App;
