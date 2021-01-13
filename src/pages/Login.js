import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import saveEmail from '../actions';

const passwordLength = 6;

function emailIsValid(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function passwordIsValid(password) {
  return password.length >= passwordLength;
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleAddEmail = this.handleAddEmail.bind(this);
    this.inputValidation = this.inputValidation.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  inputValidation() {
    const { email, password } = this.state;
    const emailValidation = emailIsValid(email);
    const passwordValidation = passwordIsValid(password);

    if (emailValidation && passwordValidation) {
      return false;
    }
    return true;
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleAddEmail(email) {
    const { dispatchEmail } = this.props;
    dispatchEmail(email);
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="container">
        <h1>LOGIN</h1>
        <form>
          <label htmlFor="email-input">
            Email
            <input
              type="email"
              name="email"
              value={ email }
              data-testid="email-input"
              placeholder="Write your email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-input">
            Senha
            <input
              type="password"
              name="password"
              value={ password }
              data-testid="password-input"
              placeholder="Password"
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/carteira">
            <button
              disabled={ this.inputValidation() }
              type="button"
              onClick={ () => this.handleAddEmail(email) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>);
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
