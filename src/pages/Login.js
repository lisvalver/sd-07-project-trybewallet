import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Actions from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
    this.buttonEnabled = this.buttonEnabled.bind(this);
    this.buttonDisabled = this.buttonDisabled.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClickLogin() {
    const { signIn, history } = this.props;
    const { email } = this.state;
    signIn(email);
    history.push('./carteira');
  }

  // Lógica do estudante Arthur Massaini
  // https://github.com/tryber/sd-07-project-trybewallet/pull/35/files
  loginValidation() {
    const { email, password } = this.state;
    const regexEmail = new RegExp('.+@[A-z]+[.]com');
    const regexPassword = new RegExp('.{6}');

    if (regexEmail.test(email) && regexPassword.test(password)) {
      return true;
    }
  }

  buttonDisabled() {
    return (
      <button type="button" disabled="disabled">
        Entrar
      </button>
    );
  }

  // prettier-ignore
  buttonEnabled() {
    return (
      <button type="button" onClick={ this.handleClickLogin }>
        Entrar
      </button>
    );
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="App">
        <input
          type="text"
          name="email"
          value={ email }
          placeholder="Digite seu e-mail"
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          value={ password }
          placeholder="Digite sua senha"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        {this.loginValidation() ? this.buttonEnabled() : this.buttonDisabled()}
      </div>
    );
  }
}

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = {
  signIn: Actions.signIn,
};

const mapStateToProps = (state) => ({
  user: state.email,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// Você deve criar um local para que a pessoa usuária insira seu email e senha. Utilize o atributo data-testid="email-input" para o email e data-testid="password-input" para a senha.

// Crie um botão com o texto ‘Entrar’.
