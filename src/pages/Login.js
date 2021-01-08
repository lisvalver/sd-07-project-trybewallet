import React from 'react';

class Login extends React.Component {
  render() {
    return (
    <div>
      <form>
        <input trype="text" data-testid="email-input" placeholder="E-mail"></input>
        <input trype="password" data-testid="password-input" placeholder="Senha"></input>
        <button type="submit">Entrar</button>
      </form>
    </div>
    );
  }
}

export default Login;
