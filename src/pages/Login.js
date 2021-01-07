import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    const entra = document.getElementById('btn-entra');
    entra.removeAttribute('disabled');
  }

  handleLogin() {
    const { email, senha } = this.state;
    if (email === 'strongreen@strongreen.com' && senha === 'strongreen') {
      this.props.history.push('/carteira');
    } else {
      const entra = document.getElementById('btn-entra');
      entra.setAttribute('disabled', '');
    }
  }

  render() {
    const { email, senha } = this.state;
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
            name="email"
            value={ email }
            placeholder="email"
            data-testid="email-input"
            onChange={ this.onInputChange }
            required
          />
          <input
            type="password"
            id="senha"
            value={ senha }
            name="senha"
            onChange={ this.onInputChange }
            placeholder="Senha"
            data-testid="password-input"
            required
          />
          <div id="remember">
            <label htmlFor="lembrar">
              <input type="checkbox" id="lembrar" value="remember-me" />
              Lembrar login?
            </label>
          </div>
          <button
            id="btn-entra"
            type="submit"
            onClick={ this.handleLogin }
            disable
          >
            Entrar
          </button>
        </form>
        <Link to="/">Esqueceu a senha?</Link>
      </div>
    );
  }
}

export default Login;
