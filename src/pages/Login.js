import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        Login-Logo
        <input type="text" data-testid="email-input" placeholder="Insira seu email" />
        <input type="password" data-testid="password-input" placeholder="senha" />
        <button type="button">Entrar</button>
      </div>
    );
  }
}

export default Login;
