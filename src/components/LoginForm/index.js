import React from 'react';
import PropTypes from 'prop-types';
import './LoginForm.css';

class LoginForm extends React.Component {
  render() {
    const { formData, onInputChange, onSubmit, buttonIsAble } = this.props;
    const { email, password } = formData;
    return (
      <div className="login-form">
        <h1 className="login-title">TrybeWallet</h1>
        <div>
          <form className="login-form-form">
            <div>
              <input
                data-testid="email-input"
                type="email"
                id="email"
                name="email"
                placeholder="Enter your E-mail"
                value={ email }
                onChange={ (event) => onInputChange(event) }
                className="login-input"
              />
            </div>
            <div>
              <input
                data-testid="password-input"
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={ password }
                onChange={ (event) => onInputChange(event) }
                className="login-input"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={ onSubmit }
                disabled={ buttonIsAble }
                className="login-button"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  formData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonIsAble: PropTypes.bool.isRequired,
};

export default LoginForm;
