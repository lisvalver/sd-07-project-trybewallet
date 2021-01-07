import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions';

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
        const emailvalidation = /[\w\d]+@+[\w\d]+.com/;
        const minLength = 6;
        if (emailvalidation.test(email) && password.length >= minLength) {
          this.setState({ isDisabled: false });
        } else {
          this.setState({ isDisabled: true });
        }
      },
    );
  }

  handleSubmit(e) {
    e.PreventDefault();
    const { history, handleLogin } = this.props;
    const { email } = this.state;
    handleLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <main className="section">
        <form onSubmit={ (e) => this.handleSubmit(e) }>
          <div className="field">
            <label htmlFor="email-input">
              E-mail:
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
          <div className="field">
            <label htmlFor="password-input">
              Senha:
              <input
                id="password-input"
                name="password"
                value={ password }
                onChange={ ({ target }) => this.handleInputChange(target) }
                data-testid="password-input"
                type="password"
                required
              />
            </label>
          </div>
          <div className="field">
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

const mapDispatchToProps = {
  handleLogin: login,
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
