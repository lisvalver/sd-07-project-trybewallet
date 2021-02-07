import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div>
        <h1>TRYBE WALLET</h1>
        <form id="loginForm">
          <label htmlFor="email">
            E-mail:
            <input
              type="text"
              id="email"
              name="email"
              data-testid="email-input"
              autoComplete="on"
            />
          </label>
          <label htmlFor="senha">
            Senha:
            <input
              type="password"
              id="senha"
              name="senha"
              data-testid="email-input"
              autoComplete="on"
            />
          </label>
          <button
            type="button"
            name="Entrar"
            data-testid="login-submit-btn"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
