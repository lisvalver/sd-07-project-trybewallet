import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <form className="login">
          <label htmlFor="email">
            Login
            <input
              id="email"
              data-testid="email-input"
              type="text"
              name="email"
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              data-testid="password-input"
              name="password"
            />
          </label>
          <button
            className="button-entrar"
            type="button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
