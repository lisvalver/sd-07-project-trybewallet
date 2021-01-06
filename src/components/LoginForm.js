import React from 'react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
  render() {
    const { handlerChange, submitlogin, validateEmailAndPassword } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="email">
            <input
              id="email"
              type="text"
              onChange={ (e) => handlerChange(e) }
              name="email"
              placeholder="Email"
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password">
            <input
              id="password"
              type="password"
              onChange={ (e) => handlerChange(e) }
              name="password"
              placeholder="Password"
              data-testid="password-input"
            />
          </label>
          <button
            type="submit"
            onClick={ (e) => submitlogin(e) }
            disabled={ validateEmailAndPassword() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  handlerChange: PropTypes.func.isRequired,
  submitlogin: PropTypes.func.isRequired,
  validateEmailAndPassword: PropTypes.func.isRequired,
};

export default LoginForm;
