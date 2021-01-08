import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginField extends Component {
  render() {
    const { userData: { email, password },
      handlerChanges, validation, handlerClick } = this.props;
    return (
      <div>
        <input
          type="email"
          name="email"
          value={ email }
          onChange={ (event) => handlerChanges(event) }
          placeholder="hermione@trybe.com"
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          value={ password }
          onChange={ (event) => handlerChanges(event) }
          placeholder="Senha"
          data-testid="password-input"
          minLength="6"
        />
        <button
          type="submit"
          disabled={ !validation }
          onClick={ handlerClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

LoginField.propTypes = {
  userData: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  validation: PropTypes.func.isRequired,
  handlerClick: PropTypes.func.isRequired,
  handlerChanges: PropTypes.func.isRequired,
};

export default LoginField;
