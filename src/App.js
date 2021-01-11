import React from 'react';
import Login from './pages/Login.js';
import { Switch, Route } from 'react-router-dom';


function App() {
  return <div>
   <Switch>
     <Route component={ Login } exact path='/'/>
   </Switch>
    </div>;
}

export default App;
