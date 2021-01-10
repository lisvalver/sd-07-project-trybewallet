import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = {
      emailInput: '',
      passwordInput: '',
      disabled: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.enableButton);
    /* Perguntar plantão porque não podemos simplesmente chamar a
    função enableButton() */
  }

  enableButton() {
    const { emailInput, passwordInput } = this.state;
    const regexForEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    const minlength = 6;
    const passwordIsValid = passwordInput.length >= minlength;
    console.log(passwordIsValid);
    const emailIsValid = regexForEmail.test(emailInput);
    console.log(emailIsValid);
    if (passwordIsValid && emailIsValid === true) {
      this.setState({
        disabled: false,
      });
    }
  }

  render() {
    const { emailInput, /* passwordInput, */ disabled } = this.state;
    const { email } = this.props;
    // Perguntar o porquê de ter essa props

    return (
      <div>
        <input
          name="emailInput"
          type="email"
          /* value={ emailInput } */
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          name="passwordInput"
          type="password"
          /* value={ passwordInput } */
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ disabled }
            onClick={ () => email(emailInput) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  email: (value) => dispatch(login(value)),
});

Login.propTypes = {
  email: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
