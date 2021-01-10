import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeEmail } from '../actions';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isValid: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.clickedFunction = this.clickedFunction.bind(this);
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    }, () => {
      this.setState({ isValid: this.isValid() });
    });
  }

  isValid() {
    const { email, password } = this.state;
    const minPasswordLenght = 6;
    const emailValid = /\S+@\S+\.\S+/;
    return emailValid.test(email) && password.length >= minPasswordLenght;
  }

  clickedFunction() {
    const { history } = this.props;
    const { email } = this.state;

    history.push('/carteira');
    changeEmail(email);
  }

  render() {
    const { email, password, isValid } = this.state;

    return (
      <div className="login-form">
        <h1> Trybe Wallet </h1>
        <form className="login">
          <label htmlFor="email">
            Login
            <input
              id="email"
              data-testid="email-input"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              data-testid="password-input"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="button-entrar"
            type="button"
            disabled={ !isValid }
            onClick={ this.clickedFunction }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispathToProps = (dispatch) => ({
  changeEmail: (email) => dispatch(changeEmail(email)),
});

export default connect(null, mapDispathToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
