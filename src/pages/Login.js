import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render() {
    return (
      <div>
        <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        />
        <form class="form-signin">
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
            <label>
              <input type="checkbox" value="remember-me" /> Lembrar login?
            </label>
          </div>
          <button type="submit">Entrar</button>
        </form>
        <Link href="#">Esqueceu a senha?</Link>
      </div>
    );
  }
}

export default Login;
