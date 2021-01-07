import React from 'react';
import Login from './pages/Login';
import { Switch, Route, Link } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
      </Switch>
    );
  }
}

export default App;
