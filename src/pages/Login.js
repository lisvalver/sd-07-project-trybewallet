import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <input type="email" data data-testid="email-input" />
        <input type="password" minLength="6" data-testid="password-input" />
      </div>
    );
  }
}

export default Login;
