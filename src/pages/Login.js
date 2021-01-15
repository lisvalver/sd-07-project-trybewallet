import PropTypes from 'prop-types';
import React from 'react';
// import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false,
    };
    this.getHandle = this.getHandle.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  getHandle({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  redirect() {
    const { email } = this.state;
    const { loginAction } = this.props;
    loginAction(email);
    this.setState({ redirect: true });
  }

  render() {
    const { email, password, redirect } = this.state;

    let checkData;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    const passwordLength = 6;
    if (regexEmail.test(email) && password.split('').length >= passwordLength) {
      checkData = false;
    } else {
      checkData = true;
    }

    return (
      <div className="login-grid">
        <input
          name="email"
          type="text"
          data-testid="email-input"
          placeholder="E-mail"
          value={ email }
          onChange={ this.getHandle }
        />
        <input
          name="password"
          type="password"
          data-testid="password-input"
          placeholder="Password"
          value={ password }
          onChange={ this.getHandle }
        />
        <button
          type="button"
          disabled={ checkData }
          onClick={ this.redirect }
        >
          Entrar
        </button>
        { redirect ? <Redirect to="/carteira" /> : ''}
      </div>
    );
  }
}

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginAction: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Login);
