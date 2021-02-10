import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveEmail, savePassword } from '../actions';

const passwordLength = 6;

function emailIsValid(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function passwordIsValid(password) {
  return password.length >= passwordLength;
}

class Login extends Component {
  /* constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    // this.handleAddEmail = this.handleAddEmail.bind(this);
    this.inputValidation = this.inputValidation.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  } */

  inputValidation() {
    const { email, password } = this.props;
    // const { password } = this.state;
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

  handleClick() {
    const { email } = this.state;
    const { addEmail } = this.props;
    addEmail(email);
  }

  /* handleAddPassword(password) {
    const { dispatchPassword } = this.props;
    dispatchPassword(password);
  }
 */

  render() {
    // const { password } = this.state;
    const { email, password, dispatchAddEmail, dispatchAddPassword } = this.props;
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
              onChange={ (e) => dispatchAddEmail(e.target.value) }
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
              onChange={ (e) => dispatchAddPassword(e.target.value) }
            />
          </label>
          <Link to="/carteira">
            <button
              disabled={ this.inputValidation() }
              type="button"
              onClick={ () => dispatchAddEmail(email) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAddEmail: (email) => dispatch(saveEmail(email)),
  dispatchAddPassword: (password) => dispatch(savePassword(password)),
});

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
