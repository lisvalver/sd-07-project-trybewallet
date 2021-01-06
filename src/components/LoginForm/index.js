import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  formData: { email, password },
  onInputChange,
  onSubmit,
  disabled,
}) => (
  <form className="ui large form">
    <div className="ui stacked segment">
      <div className="field">
        <input
          name="email"
          value={ email }
          placeholder="E-mail"
          onChange={ (event) => onInputChange(event) }
          data-testid="email-input"
        />
      </div>
      <div className="field">
        <input
          type="password"
          name="password"
          value={ password }
          placeholder="Senha"
          onChange={ (event) => onInputChange(event) }
          data-testid="password-input"
        />
      </div>
      <button
        type="button"
        onClick={ (event) => onSubmit(event) }
        disabled={ disabled }
        className="ui green large fluid button"
      >
        Entrar
      </button>
    </div>
  </form>
);

LoginForm.propTypes = {
  formData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default LoginForm;
