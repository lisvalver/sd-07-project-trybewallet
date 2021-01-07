import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logIn } from '../../actions';

import './style.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange({ name, value }) {
    this.setState(
      { [name]: value },
      () => {
        const { email, password } = this.state;
        const emailValidation = /[\w\d]+@+[\w\d]+.com/;
        const maxLength = 6;
        if (emailValidation.test(email) && password.length >= maxLength) {
          this.setState({ isDisabled: false });
        } else {
          this.setState({ isDisabled: true });
        }
      },
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const { history, handleLogin } = this.props;
    const { email } = this.state;
    handleLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;

    return (
      <main className="login__container">
        <form onSubmit={ (e) => this.handleSubmit(e) } className="login__form">
          <div className="login__field">
            <label htmlFor="email-input">
              <p>E-mail:</p>
              <input
                id="email-input"
                name="email"
                value={ email }
                onChange={ ({ target }) => this.handleInputChange(target) }
                data-testid="email-input"
                type="email"
                placeholder="ada@lovelace.com"
                autoComplete="off"
                autoCorrect="off"
                required
              />
            </label>
          </div>
          <div className="login__field">
            <label htmlFor="password-input">
              <p>Senha:</p>
              <input
                id="password-input"
                name="password"
                value={ password }
                onChange={ ({ target }) => this.handleInputChange(target) }
                placeholder="Sua senha"
                data-testid="password-input"
                type="password"
                required
              />
            </label>
          </div>
          <div className="login__field">
            <button
              type="submit"
              disabled={ isDisabled }
            >
              Entrar
            </button>
          </div>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  handleLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  handleLogin: logIn,
};

export default connect(null, mapDispatchToProps)(Login);
