import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: true,
      loginEmail: '',
      loginPassword: '',
    };
    this.inputHandle = this.inputHandle.bind(this);
    this.inputValidate = this.inputValidate.bind(this);
  }

  inputValidate() {
    const { loginEmail, loginPassword } = this.state;
    const minValue = 6;
    const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    const boolEmail = regexEmail.test(String(loginEmail).toLowerCase());
    const boolPassword = loginPassword.length >= minValue;

    return !(boolEmail && boolPassword);
  }

  inputHandle({ name, value }) {
    this.setState({ [name]: value }, () => {
      const buttonDisabled = this.inputValidate();
      this.setState({ buttonDisabled });
    });
  }

  render() {
    const { buttonDisabled, loginEmail, loginPassword } = this.state;
    const { doLogin } = this.props;
    return (
      <div>
        Login

        <form>
          <label htmlFor="loginEmail">
            <input
              type="email"
              id="loginEmail"
              name="loginEmail"
              placeholder="Email"
              data-testid="email-input"
              value={ loginEmail }
              onChange={ ({ target }) => this.inputHandle(target) }
            />
          </label>

          <label htmlFor="loginPassword">
            <input
              type="password"
              id="loginPassword"
              name="loginPassword"
              placeholder="Password"
              data-testid="password-input"
              value={ loginPassword }
              onChange={ ({ target }) => this.inputHandle(target) }
            />
          </label>
          <Link to="/carteira">
            <button
              type="button"
              id="enterButton"
              disabled={ buttonDisabled }
              onClick={ () => doLogin(loginEmail) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  doLogin: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  doLogin: PropTypes.func.isRequired,
};
