import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render() {
    return (
      <div>
        <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="avatar"
        />
        <form>
          <input
            type="email"
            id="email"
            placeholder="email"
            data-testid="email-input"
            required
          />
          <input
            type="password"
            id="senha"
            placeholder="Senha"
            data-testid="password-input"
            required
          />
          <div id="remember">
            <label htmlFor="lembrar">
              <input type="checkbox" id="lembrar" value="remember-me" /> Lembrar login?
            </label>
          </div>
          <button type="submit">Entrar</button>
        </form>
        <Link to="/">Esqueceu a senha?</Link>
      </div>
    );
  }
}

export default Login;
