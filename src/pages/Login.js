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
    console.log(target);
    const { name, value } = target;
    this.setState({ [name]: value });
    this.enableButton();
  }

  enableButton() {
    const { emailInput, passwordInput } = this.state;
    console.log(passwordInput.length);
    const regexForEmail = /\S+@\S+\.\S+/;
    const minlength = 5;
    const passwordIsValid = passwordInput.length >= minlength;
    // Perguntar poque o length está saindo errado
    const emailIsValid = regexForEmail.test(emailInput);
    if (passwordIsValid && emailIsValid === true) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { emailInput, passwordInput, disabled } = this.state;
    const { email } = this.props;
    // Perguntar o porquê de ter essa props

    return (
      <div>
        <input
          id="emailInput"
          name="emailInput"
          type="email"
          value={ emailInput }
          data-testid="email-input"
          onChange={ (event) => this.handleChange(event) }
        />
        <input
          id="passwordInput"
          name="passwordInput"
          type="password"
          value={ passwordInput }
          data-testid="password-input"
          onChange={ (event) => this.handleChange(event) }
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
