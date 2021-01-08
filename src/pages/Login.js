import React from 'react';
import LoginForm from '../components/LoginForm';

class Login extends React.Component {
  render() {
    return (
      <div>
        <LoginForm { ...this.props } />
      </div>
    );
  }
}

export default Login;
