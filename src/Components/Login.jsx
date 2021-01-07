import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div className="container-form">
        <form>
          <div className="input-group">
            <input
              type="email"
              placeholder="E-mail"
              className="input"
              data-testid="email-input"
              name="input-email"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Senha"
              className="input"
              data-testid="password-input"
            />
          </div>
          <button type="submit" className="btn-login" name="btn-login">Entrar</button>
        </form>
        <a href="/" className="forgot-pass">Forgot password?</a>
      </div>
    );
  }
}

export default Login;
