import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.getDataInputs = this.getDataInputs.bind(this);
    this.validation = this.validation.bind(this);
    this.setEmailToProps = this.setEmailToProps.bind(this);
    this.state = {
      email: '',
      password: '',
      emailIsValid: false,
      passwordIsValid: false,
      buttonState: true,
    };
  }

  getDataInputs(event) {
    const { name, value, validity } = event.target;
    const { valid } = validity;
    this.setState({
      [name]: value,
      [`${name}IsValid`]: valid,
      buttonState: true,
    });
    if (valid) this.validation();
  }

  setEmailToProps(data) {
    const { email } = this.props;
    email(data);
  }

  validation() {
    const { emailIsValid, passwordIsValid, email } = this.state;
    if (emailIsValid && passwordIsValid) {
      this.setEmailToProps(email);
      this.setState({ buttonState: false });
    }
  }

  render() {
    const { email, password, buttonState } = this.state;

    return (
      <div className="login-inputs">
        <br />
        <label htmlFor="email">
          E-mail
          <input
            type="text"
            className="login-email"
            name="email"
            value={ email }
            onChange={ this.getDataInputs }
            data-testid="email-input"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            className="login-password"
            name="password"
            value={ password }
            onChange={ this.getDataInputs }
            data-testid="password-input"
            pattern="[a-z0-9._%+-]{5,}"
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ buttonState }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  email: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  email: (email) => dispatch(login(email)) });

export default connect(null, mapDispatchToProps)(Login);
