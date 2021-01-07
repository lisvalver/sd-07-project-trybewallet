import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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

  componentDidMount() {
    const entra = document.getElementById('btn-entra');
    entra.setAttribute('disabled', '');
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { email, senha } = this.state;
      const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regEmail.test(email) && senha.length < 6) {
        return console.log('Invalid Email');
      }
      const entra = document.getElementById('btn-entra');
      if (email === 'strongreen@strongreen.com' && senha === 'strongreen') {
        entra.removeAttribute('disabled');
      } else {
        entra.setAttribute('disabled', '');
      }
    });
  }

  handleLogin() {
    const { history } = this.props;
    history.push('/carteira');
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
            value={email}
            placeholder="email"
            data-testid="email-input"
            onChange={this.onInputChange}
            required
          />
          <input
            type="password"
            id="senha"
            value={senha}
            name="senha"
            onChange={this.onInputChange}
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
          <button id="btn-entra" type="submit" onClick={this.handleLogin}>
            Entrar
          </button>
        </form>
        <Link to="/">Esqueceu a senha?</Link>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Login;
