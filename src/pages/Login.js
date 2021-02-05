import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import { emailUser } from '../actions';

// Retirei o Constructor do colega Alvaro por não lembrar a sua utilização.
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.validEmail = this.validEmail.bind(this);
    this.validPassword = this.validPassword.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  validEmail() {
    const { email } = this.state;
    const format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(format)) {
      return true;
    }
    return false;
  }

  validPassword() {
    const { password } = this.state;
    const minChar = 6;
    if (password.length >= minChar) return true;
    return false;
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }), () => {
      if (this.validEmail() && this.validPassword()) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  }

  handleClick() {
    const { login } = this.props;
    const { email } = this.state;
    login(email);
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            className="form-control"
            name="email"
            type="email"
            data-testid="email-input"
            placeholder="Digite seu email"
            value={ email }
            onChange={ this.handleInput }
          />
        </label>
        <p>
          Nós nunca iremos compartilhar seu e-mail com ninguém.
        </p>
        <label htmlFor="password">
          Senha
          <input
            className="form-control"
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Senha"
            value={ password }
            onChange={ this.handleInput }
          />
        </label>
        <Link to="/carteira">
          {email}
          <button
            disabled={ disabled }
            onClick={ this.handleClick }
            type="button"
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  login: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(emailUser(e)),
});

export default connect(null, mapDispatchToProps)(Login);
