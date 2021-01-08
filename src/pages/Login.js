import React from 'react';
import { LoginForm } from '../Components'

class Login extends React.Component {
  render() {
    return (
      <div>
        <LoginForm history={this.props.history}/>
      </div>
    );
  }
}

export default Login;
