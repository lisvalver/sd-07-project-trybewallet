import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAction } from '../../actions';

const regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z]{2,3})+$/i;

const LoginForm = ({ email, addUser }) => {
  const [isValid, setIsValid] = useState(false);
  const six = 6;

  const validateAll = (login = '', password = '') => {
    if (login) addUser(login);
    if (regex.test(String(email)) && password.length >= six) return setIsValid(true);
    return setIsValid(false);
  };

  return (
    <section className="login-section">
      <form>
        <label htmlFor="email-input">
          Email:
          <input
            type="text"
            id="email-input"
            data-testid="email-input"
            onChange={ ({ target: { value } }) => validateAll(value) }
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            type="password"
            id="password-input"
            data-testid="password-input"
            onChange={ ({ target: { value } }) => validateAll(email, value) }
          />
        </label>
      </form>
      <Link to="/carteira">
        <button type="button" disabled={ !isValid }>
          Entrar
        </button>
      </Link>
    </section>
  );
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  addUser: (email) => dispatch(loginAction.addUser(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  addUser: PropTypes.func.isRequired,
};
