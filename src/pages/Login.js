import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { sendEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.verifyLogin = this.verifyLogin.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  verifyLogin() {
    const { email, password } = this.state;
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const validateEmail = regexEmail.test(email);
    const SIX = 6;
    const validatePassword = password.length >= SIX;

    if (validateEmail && validatePassword) {
      return false;
    }
    return true;
  }

  render() {
    const { email } = this.state;
    const { send } = this.props;

    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Digite seu e-mail"
            data-testid="email-input"
            onChange={ (e) => this.setState({ email: e.target.value }) }
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            data-testid="password-input"
            onChange={ (e) => this.setState({ password: e.target.value }) }
          />

          <Link to="/carteira">
            <button
              type="button"
              disabled={ this.verifyLogin() }
              onClick={ () => send(email) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  send: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  send: (email) => dispatch(sendEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
