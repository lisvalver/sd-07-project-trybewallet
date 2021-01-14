import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.emailHandler = this.emailHandler.bind(this);
    this.passwordHandler = this.passwordHandler.bind(this);
    this.dataVerify = this.dataVerify.bind(this);
    this.submitBtn = this.submitBtn.bind(this);
  }

  // https://www.w3resource.com/javascript/form/email-validation.php

  dataVerify() {
    const { email, password } = this.state;
    const minLength = 6;
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      .test(email) && password.length >= minLength) {
      return true;
    }
    return false;
  }

  emailHandler(event) {
    const { value } = event.target;
    this.setState({ email: value });
  }

  passwordHandler(event) {
    const { value } = event.target;
    this.setState({ password: value });
  }

  submitBtn() {
  }

  render() {
    const { email } = this.state;
    const { addEmail } = this.props;
    return (
      <div>
        <input onChange={ this.emailHandler } type="email" data-testid="email-input" />
        <input
          onChange={ this.passwordHandler }
          type="password"
          data-testid="password-input"
        />
        {/* Código do Luciano Berchon: botão dentro do <Link> */}
        <Link to="/carteira">
          <button
            onClick={ () => addEmail(email) }
            type="button"
            disabled={ !this.dataVerify() }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(login(email)),
});

Login.propTypes = { addEmail: PropTypes.func.isRequired };

export default connect(null, mapDispatchToProps)(Login);
