import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormLogin extends Component {
  render() {
    const { email, password, update } = this.props;
    return (
      <form>
        <fieldset>
          <legend>LOGIN</legend>
          <h1>Hello, TrybeWallet!</h1>
          <div>
            <label htmlFor="email">
              E-mail:
              <input
                data-testid="email-input"
                type="email"
                name="email"
                id="email"
                value={ email }
                onChange={ update }
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Senha:
              <input
                data-testid="password-input"
                type="password"
                name="password"
                id="password"
                value={ password }
                onChange={ update }
              />
            </label>
          </div>
        </fieldset>
      </form>
    );
  }
}

FormLogin.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
};

export default FormLogin;
