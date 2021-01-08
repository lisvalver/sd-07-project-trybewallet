import React from 'react';
import PropTypes from 'prop-types';

const FormLogin = ({ email, password, onInputChange, submitDisabled, handleSubmit }) => (
  <form>
    <input
      data-testid="email-input"
      type="text"
      name="email"
      value={ email }
      onChange={ (event) => onInputChange(event) }
    />
    <input
      data-testid="password-input"
      type="password"
      name="password"
      value={ password }
      onChange={ (event) => onInputChange(event) }
    />
    <input
      disabled={ submitDisabled }
      onClick={ handleSubmit }
      type="submit"
      value="Entrar"
    />
  </form>
);

FormLogin.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  submitDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default FormLogin;
